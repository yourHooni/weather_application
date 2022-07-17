export interface CityProps {
    id: string,
    name: string,
    state?: string,
    country: string,
    coord?: object
};

export type CityListProps = Array<CityProps>;