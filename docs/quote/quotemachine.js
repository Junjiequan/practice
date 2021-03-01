const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

class APP extends React.Component{
    state = {
        quotes:[
            {
                quote: "life is not easy",
                author: "randome guy"
            }
        ],
        index:0
    }
    componentDidMount=()=>{
        fetch(API)
        .then(result => result.json())
        .then(result => {
            this.setState({
                quotes: result.quotes
            })
        });
    }
    getRandomIndex =()=>{
        const {quotes} = this.state;
        
        if(quotes.length > 0){
            const index = Math.floor(Math.random() * quotes.length);
            this.setState({
                index
            })
        }
    }
    render(){
        const {quotes, index} = this.state;
        const article = quotes[index];
        const tweetlink = `https://twitter.com/intent/tweet?text=${article.quote} - ${article.author}`;
        const facebook = 'https://www.youtube.com/watch?v=iGWei_0EJIc'
        
        return (
            <div className="d-flex justify-content-center vh-100 align-items-center">
                <div className="col-6 p-5 box rounded quote-box">
                        {article && (
                            <div id="boxSize" >
                                <p>{article.quote}</p>
                                <cite id="author">- {article.author}</cite>
                            </div>
                        )}
                        <div className="d-flex justify-content-between">
                            <div >
                            <a className="btn btn-primary " href={tweetlink} target="_blank"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-primary ms-1" href={facebook} target="_blank"><i className="fab fa-youtube"></i></a>
                            </div>
                            <button className="btn btn-primary" onClick={this.getRandomIndex.bind(this)}>Get Quote</button>
                        </div>
                </div>
            </div>
        )
    }

}




ReactDOM.render(<APP />, document.getElementById('app'))
