module.exports=function Wish(oldWish){
    this.items=oldWish.items|| {};
    this.add=function(item,id){
        var storedItem=this.items[id];
        if(!storedItem){
            storedItem=this.items[id] = {item:item, price: item.price};
        }
        
        
    };
    /*this.reducebyOne1=function(id){
        delete this.items[id];
       
    };
    this.removeAll=function(id){
        
        this.totalQty-=this.items[id].qty;
        this.totalPrice-=this.items[id].price;
            delete this.items[id];
    
    };*/
    this.generateArray = function(){
        var arr=[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};
