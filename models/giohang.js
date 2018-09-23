module.exports = function GioHang(oldCart) {
    this.items = oldCart.items || {};
    this.Tongsanpham = oldCart.Tongsanpham || 0;
    this.Tonggia = oldCart.Tonggia || 0;

    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, soluong: 0, gia: 0 };
        }
        storedItem.soluong++;
        storedItem.gia = storedItem.item.gia * storedItem.soluong;
        this.Tongsanpham++;
        this.Tonggia += storedItem.item.gia;
    };
    this.them1 = function(id) {
        this.items[id].soluong++;
        this.items[id].gia += this.items[id].item.gia;
        this.Tongsanpham++;
        this.Tonggia += this.items[id].item.gia;

    }
    this.tru1 = function(id) {
        this.items[id].soluong--;
        this.items[id].gia -= this.items[id].item.gia;
        this.Tongsanpham--;
        this.Tonggia -= this.items[id].item.gia;
        if (this.items[id].soluong <= 0) {
            delete this.items[id];
        }
    }
    this.Xoatatca = function(id) {
        this.Tongsanpham -= this.items[id].soluong;
        this.Tonggia -= this.items[id].gia;
        delete this.items[id];
    };
    this.generateArray = function() {
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};