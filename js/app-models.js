function Product(name, size, price, pic) {
    this.name = name;
    this.pic = pic ?? 'images/no-image.png';
    this.size = size;
    this.price = price;
}

