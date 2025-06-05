export function formatCurrency(amount: number){
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(amount)
}

export function getImagePath(image: string) {
    if (image.startsWith("https://res.cloudinary.com")) {
        return image;
    }
    return `/products/${image}.jpg`;
}   