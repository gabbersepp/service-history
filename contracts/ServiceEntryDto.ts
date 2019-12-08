export default interface ServiceEntryDto {
    id: number;
    category: string;
    name: string;
    additionalFields: { name: string, checked: boolean }
}