import { useState, useEffect, useMemo, useCallback } from "react";
import ModesService from "../services/modes.service";
import { Mode, ModeFieldsMap } from "../interfaces/modes.interfaces";

const useGame = () => {
  const [modes, setModes] = useState<Mode[]>([]);
  const [selectedMode, setSelectedMode] = useState<Mode>();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [fieldsMap, setFieldsMap] = useState<ModeFieldsMap>({});

  const fieldCells = useMemo(
    () => {
    return new Array(selectedMode?.field)
      .fill(0)
      .map(() => new Array(selectedMode?.field).fill(0));
  }, [selectedMode]);

  const hoveredCells = useMemo(
    () =>
      Object.keys(fieldsMap).map((key) => {
        const [rowId, cellId] = key.split("/").map((key) => +key + 1);
        return { rowId, cellId };
      }),
    [fieldsMap]
  );

  const loadModes = useCallback(async () => {
    try {
      const res = await ModesService.fetchModes();
      setModes(res);
      changeMode(res[0]);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const changeMode = (mode: Mode) => {
    setSelectedMode(mode);
    setIsStarted((started) => (started ? false : started));
  };

  const toggleCell = (rowIdx: number, cellIdx: number) => {
    if (isStarted) {
      const cellId = `${rowIdx}/${cellIdx}`;

      setFieldsMap((fieldsMap) => {
        const field = fieldsMap[cellId];
        if (field) {
          const copy = structuredClone(fieldsMap);
          delete copy[cellId];
          return copy;
        } else {
          return {
            ...fieldsMap,
            [cellId]: true,
          };
        }
      });
    }
  };

  const toggleIsStarted = () => {
    setIsStarted((started) => !started);
  };

  const isCellEnabled = (rowIdx: number, cellIdx: number) =>
    fieldsMap[`${rowIdx}/${cellIdx}`];

  useEffect(() => {
    loadModes();
  }, [loadModes]);

  return {
    modes,
    fieldsMap,
    isStarted,
    fieldCells,
    hoveredCells,
    selectedMode,
    changeMode,
    toggleCell,
    isCellEnabled,
    toggleIsStarted,
  };
};

export default useGame;
