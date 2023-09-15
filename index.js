function App() {
    const [expression, setExpression] = React.useState("");
    const [answer, setAnswer] = React.useState(expression);

    const display = (symbol) => {
        setExpression((previousExpression) => {
            if (
                /[+*-/]/.test(symbol) &&
                /[+*-/]/.test(previousExpression[previousExpression.length - 1])
            ) {
                let newValue;

                if (/[-]/.test(symbol)) {
                    newValue = previousExpression.slice(0, previousExpression.length) + symbol;
                } else {
                    let count = 0;

                    for (let i = 0; i < previousExpression.length; i++) {
                        if (isNaN(previousExpression[i])) {
                            count++;
                        } else {
                            count = 0;
                        }
                    }
                    newValue = previousExpression.slice(0, previousExpression.length - count) + symbol;
                }
                setExpression(newValue);

            } else {
                if (previousExpression) {
                    previousExpression = previousExpression + "";

                    let calculatedValues = previousExpression.split(/[+/*-]/g);
                    console.log("calculatedValues " + JSON.stringify(calculatedValues));

                    let lastNumber = calculatedValues[calculatedValues.length - 1];

                    if (!isNaN(lastNumber) && /[.]/.test(lastNumber) && symbol === ".") {
                        console.log("symbol = empty");
                        symbol = "";
                    }
                }
    
            setExpression(
                (previousExpression + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
            );
            }
        });
    
        setAnswer((previousExpression) =>
            (previousExpression + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
        );
    };

    const calculate = () => {
        setAnswer(eval(expression));
        setExpression(eval(expression));
    };

    const allClear = () => {
        setExpression("");
        setAnswer(0);
    };
    const clear = () => {
        setExpression((previousExpression) => 
            previousExpression
                .split("")
                .slice(0, previousExpression.length-1)
                .join("")
        );
        setAnswer(0)
    };
    
    return (
        <div className="container">
            <div className="grid">
                <div id="display" className="display">
                    <input type="text" value={expression} placeholder="0" disabled />
                    <div className="total">{answer}</div>
                </div>
                <div id="clear" onClick={allClear} className="padButton AC tomato">AC</div>
                <div id="backspace" onClick={clear} className="padButton C tomato">C</div>  
                <div id="divide" onClick={() => display("/")} className="padButton divide">/</div>  
                <div id="multiply" onClick={() => display("*")} className="padButton times">x</div>  
                <div id="seven" onClick={() => display("7")} className="padButton seven dark-gray">7</div>  
                <div id="eight" onClick={() => display("8")} className="padButton eight dark-gray">8</div>  
                <div id="nine" onClick={() => display("9")} className="padButton nine dark-gray">9</div>  
                <div id="subtract" onClick={() => display("-")} className="padButton minus">-</div>  
                <div id="four" onClick={() => display("4")} className="padButton four dark-gray">4</div>  
                <div id="five" onClick={() => display("5")} className="padButton five dark-gray">5</div>
                <div id="six" onClick={() => display("6")} className="padButton six dark-gray">6</div>
                <div id="add" onClick={() => display("+")} className="padButton plus">+</div>  
                <div id="one" onClick={() => display("1")} className="padButton one dark-gray">1</div>  
                <div id="two" onClick={() => display("2")} className="padButton two dark-gray">2</div>  
                <div id="three" onClick={() => display("3")} className="padButton three dark-gray">3</div>  
                <div id="equals" onClick={calculate} className="padButton equals blue">=</div>  
                <div id="zero" onClick={() => display("0")} className="padButton zero dark-gray">0</div>  
                <div id="decimal" onClick={() => display(".")} className="padButton decimal dark-gray">.</div>     
            </div>    
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))