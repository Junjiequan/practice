const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];

class APP extends React.Component{
    constructor(props){
        super(props);
    this.state = {
        quotes: [0],
        index:0,
        bgColor: '#BDBB99'
    }
}
componentDidMount(){
    fetch(API)
    .then(result => result.json())
    .then(result => {
        this.setState({
            quotes: result.quotes
        })
    });
}
getRandomIndex(){
        const {quotes} = this.state;
        const index = Math.floor(Math.random() * quotes.length);
        this.setState({
             index
          })
    }
componentDidUpdate(){
    const {bgColor} = this.state;
    const bodybg = document.querySelector("body");
    bodybg.style.backgroundColor = bgColor;
    const btnbg = document.querySelector("button");
    btnbg.style.backgroundColor = bgColor;
    const abg = document.querySelector("a");
    abg.style.backgroundColor = bgColor;
    const pcolor = document.querySelector("p");
    pcolor.style.color = bgColor;
    const citecolor = document.querySelector("cite");
    citecolor.style.color = bgColor;
}  
getRandomColor = () =>{
    const bgColor = this.state;
    if(colors.length > 0){
        const bgColor = colors[Math.floor(Math.random() * colors.length)];
        this.setState({
            bgColor
        })
    }
}
wrapperFunction = () => {
    this.getRandomIndex();
    this.getRandomColor();
}
    render(){
        const article = this.state.quotes[this.state.index];
        const tweetlink = `https://twitter.com/intent/tweet?text=${article.quote} - ${article.author}`;
        const facebook = 'https://www.youtube.com/watch?v=iGWei_0EJIc';
        return (
            <div className="d-flex justify-content-center vh-100 align-items-center vw-90">
                <div className="p-4 box rounded quote-box">
                        {article && (
                            <div id="boxSize" >
                                <p><span className="fs-2 me-2"><i className="fa fa-quote-left"></i></span>{article.quote}</p>
                                <cite id="author">- {article.author}</cite>
                            </div>
                        )}
                        <div className="d-flex justify-content-between">
                            <div >
                              <a className="btn btn-primary " href={tweetlink} target="_blank"><i className="fab fa-twitter"></i></a>
                            </div>
                            <button className="btn btn-primary" onClick={this.wrapperFunction}>Get Quote</button>
                        </div>
                </div>
            </div>
            
        )
    }

}
ReactDOM.render(<APP />, document.getElementById('app'))
