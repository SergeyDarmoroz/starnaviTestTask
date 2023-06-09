import { Mode } from "../interfaces/modes.interfaces";

const modesService = () => {
  const fetchModes: () => Promise<Mode[]> = () => {
    return fetch("https://60816d9073292b0017cdd833.mockapi.io/modes").then(
      (res) => res.json()
    );
  };

  return { fetchModes };
};

const ModesService = modesService();
export default ModesService;
