import { Technologie } from "./Technologie";

export interface User {
    id: string;
    name: string;
    username: string;
    technologies: Technologie[];
}
