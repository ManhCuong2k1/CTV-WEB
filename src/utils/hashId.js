export const getHashIdFromSlug = (slug) => {
    const hashId = slug.split('-');

    return hashId[hashId.length - 1];
};

export const stringToSlug = (str) => str.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
