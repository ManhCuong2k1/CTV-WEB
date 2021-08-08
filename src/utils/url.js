export const baseUrl = process.browser ? `${window.location.protocol}//${window.location.host}` : process.env.APP_URL;

export function image(imageItem, size) {
    if (imageItem) {
        if (!imageItem.includes('http')) {
            return size
                ? `${process.env.IMAGE_BASE_URL}/${size}/${imageItem}`
                : `${process.env.IMAGE_BASE_URL}/${imageItem}`;
        }
    }
    return imageItem;
}
