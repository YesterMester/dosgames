export const generateSlug = (text) => {
    return text.toLowerCase()
        .normalize('NFD') // Normalize to decompose special characters into their composing characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/-+/g, '-'); // Replace multiple - with single -
}

export const getTags = (tags) => {
    return tags.split(',').map((tag) => tag.trim());
}

export const getFormattedDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}