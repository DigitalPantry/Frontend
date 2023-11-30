interface Item {
    id?: number,
    name: string,
    category: string,
    expiration?: string,
    quantity: number,
    household_id?: number,
    found_in: string,
}

interface ItemResponse {
    success: boolean,
    message: string,
    items?: Item[],
};

export { Item, ItemResponse };