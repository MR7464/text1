class Ajax{
    constructor(){
        this.xhr=new XMLHttpRequest();
        this.xhr.addEventListener("readystatechange",this.readyStateChangeHandler.bind(this))
    }
    static getInstance(){
        if(!Ajax._instance){
            Object.defineProperty(Ajax,"_instance",{
                writable:true,
                value:new Ajax()
            })
        }
        return Ajax._instance;
    }
    send(obj){
        this.xhr.open(Ajax.METHOD,Ajax.URL+Ajax.PORT+"?time="+new Date().getTime());
        this.xhr.send(encodeURIComponent(JSON.stringify(obj)));
    }
    readyStateChangeHandler(e){
        if(this.xhr.readyState===4 && this.xhr.status===200){
            let obj=JSON.parse(decodeURIComponent(this.xhr.response));
            switch (obj.type){
                case 1:
                    Main.getInstance().goodsList=obj.resolute;
                    break;
                default:
                    Main.getInstance().shoppingList=obj.resolute;
                    break;
            }
        }
    }

    static get URL(){
        return "http://10.9.25.231";
    }
    static get PORT(){
        return ":3003";
    }
    static get METHOD(){
        return "POST"
    }
}