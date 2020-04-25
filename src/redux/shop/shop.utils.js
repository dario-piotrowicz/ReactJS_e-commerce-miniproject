
const collectionTitleIdMap = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
};

export const collectionTitleToId = title => {
    const lowerTitle = title.toLowerCase();
    return collectionTitleIdMap[lowerTitle] ? collectionTitleIdMap[lowerTitle] : -1
};
