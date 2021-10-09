import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //to store numbers
            nums: [],
            //to store operators
            ops: [],
            //the current number entred
            crntN: '',
            //display entred button
            inputs: '',
            //initialize the result
            //store the last result for later
            lresult: '',
            //last opertaors
            lops:[],
        }
        this.reset = this.reset.bind(this);
    }
    // called when numbers are clicked
    handleNums(i){
        //if = is clicked the a number is clicked reset values
        if(this.state.inputs.indexOf('=') !== -1){
            this.setState({
                nums: [],
                ops: [],
                crntN: '',
                inputs: '',
                lresult: 0,
                message:'',
            })
        }
        // always update crntN when inputing numbers
        this.setState({
            crntN: this.state.crntN + i,
        })
        //but if the number starts with 0 and there is no . keep the actual value
        if(this.state.crntN.match(/^0/) && this.state.crntN.indexOf(".") === -1){
            this.setState({
                crntN: this.state.crntN,
            })
        }
    }
    // called when operators are clicked
    handleOps(i){
        //when an operator is clicked after changing crntN value :
        if(this.state.crntN){
            //when clicking - following immediatly by an operator
            if(this.state.crntN === '-' && (i === "x" || i === "/" || i === "+")){
                this.setState({
                    inputs: this.state.inputs + this.state.crntN + i,
                    crntN:'',
                    //cancel the last operator
                    ops: this.state.ops.slice(0,this.length-1).concat(i),
                })
            }else{
                //when inputing a valid number
                if(Number(this.state.crntN) || Number(this.state.crntN)===0){
                    this.setState({
                        //store it in nums
                        nums: this.state.nums.concat(Number(this.state.crntN)),
                        //and store the current operator in ops
                        ops: this.state.ops.concat(i),
                    })
                }else{
                    //number unvalid : show error ex: ".+="
                    console.log("Math format error")
                    this.setState({
                        message: "Math format error",
                    })
                }
                this.setState({
                    inputs: this.state.inputs + this.state.crntN + i,
                    crntN:'',
                })
            }
        }else{
            //if an operator immediatly after getting a result
            if(this.state.lresult){
                this.setState({
                    //store the last result in nums
                    nums: this.state.nums.concat(Number(this.state.lresult)),
                    //display the last result plus the operator clicked
                    inputs: this.state.lresult + i,
                    //reset the last result value and the crnN
                    lresult: '',
                    crntN:'',
                    //store the operator clicked in ops
                    ops: this.state.ops.concat(i),
                })
            }else{
                // if two or more operators are entred delete the first one
                if(this.state.nums.length ===0){
                    this.setState({
                        nums: this.state.nums.concat(Number(this.state.crntN)),
                        inputs: this.state.inputs + this.state.crntN + i,
                        ops: this.state.ops.slice(0,this.length-1).concat(i),
                    })
                }else{
                    //if the operation starts whit an operator
                    this.setState({
                        inputs: this.state.inputs + i,
                        ops: this.state.ops.slice(0,this.length-1).concat(i),
                    })
                }
            }
        }
    }
    //called when . clicked
    handleDecimal(i){
        //Allow  . one time
        if(this.state.crntN.indexOf('.') === -1){
            this.setState({
                crntN: this.state.crntN + i,
            })
        }
    }
    //called when AC clicked
    reset(){
        // initial state
        this.setState({
            nums: [],
            ops: [],
            crntN: '',
            inputs: '',
            lresult: 0,
            message:'',
        })
    }
    //called when = clicked
    result(i){
        this.setState({
            //store the resull in lresult calculated by calculat function
            lresult: Number(calculat(this.state.nums.concat(Number(this.state.crntN)),this.state.ops)),
            //display the last input
            inputs: this.state.inputs + this.state.crntN + i,
            //reset
            nums: [],
            crntN: '',
            ops:[],
        })
    }
    //called when - clicked
    negative(i){
        //when clicking - before setting crntN
        if(this.state.crntN.indexOf('-') === -1){
            if(!this.state.crntN){
                //and after getting a result
                if(this.state.inputs.indexOf('=') !== -1){
                    this.setState({
                        //store the last result back in the nums then
                        nums: this.state.nums.concat(Number(this.state.lresult)),
                        inputs: "" + this.state.lresult,
                        lresult: '',
                        crntN:'-',
                        //store + operator
                        ops: this.state.ops.concat('+'),
                    })
                }//if the opration starts with -
                else{
                    this.setState({
                        inputs: this.state.crntN ,
                        crntN: i,
                    })
                }
            }
            //if crntN is a valid value
            else{
                this.setState({
                    //first store the crntN
                    nums: this.state.nums.concat(Number(this.state.crntN)),
                    inputs: this.state.inputs +  this.state.crntN,
                    //then assign a negative to it
                    crntN: i,
                    //store + operator
                    ops: this.state.ops.concat('+'),
                })
            }
        }
    }
    render(){
        const current = this.state.crntN;
        const inputs = this.state.inputs;
        const nums = this.state.lresult;
        return (
            <div className="container" id="container">
                <div className="container" id="calc">
                    <div className="screen">
                        { inputs ? <p>{inputs}</p>: current ? <p>{current}</p> : <p style={{ color: "transparent" }}>.</p>}
                        <p id="display">
                        { nums ? nums : current ? current : 0}
                        </p>
                    </div>
                    <div className="bg-dark">
                    <div className="row">
                        <div className="col d-flex flex-column">
                            <button className="btn" onClick={()=>this.handleOps("+")} id="add">+</button>
                            <button className="btn" onClick={()=>this.negative("-")} id="subtract">-</button>
                        </div>
                        <div className="col d-flex align-items-center">
                            <button className="btn col" onClick={()=>this.result("=")} id="equals">=</button>
                        </div>
                        <div className="col d-flex flex-column">
                            <button className="btn" onClick={()=>this.handleOps("/")} id="divide">/</button>
                            <button className="btn" onClick={()=>this.handleOps("x")} id="multiply">x</button>
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn col" onClick={()=>this.handleNums(1)} id="one">1</button>
                        <button className="btn col" onClick={()=>this.handleNums(2)} id="two">2</button>
                        <button className="btn col" onClick={()=>this.handleNums(3)} id="three">3</button>
                    </div>
                    <div className="row">
                        <button className="btn col" onClick={()=>this.handleNums(4)} id="four">4</button>
                        <button className="btn col" onClick={()=>this.handleNums(5)} id="five">5</button>
                        <button className="btn col" onClick={()=>this.handleNums(6)} id="six">6</button>
                    </div>
                    <div className="row">
                        <button className="btn col" onClick={()=>this.handleNums(7)} id="seven">7</button>
                        <button className="btn col" onClick={()=>this.handleNums(8)} id="eight">8</button>
                        <button className="btn col" onClick={()=>this.handleNums(9)} id="nine">9</button>
                    </div>
                    <div className="row">
                        <button className="btn col" onClick={()=>this.handleDecimal(".")} id="decimal">.</button>
                        <button className="btn col" onClick={()=>this.handleNums(0)} id="zero">0</button>
                        <button className="btn col" onClick={this.reset} id="clear" >AC</button>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
function calculat(nums,ops){
    console.log(nums,ops)
    if(nums.length === ops.length + 1){
        let m = ops.indexOf('/');
        while(ops.indexOf('/')>=0){
            if(nums[m+1]){
            nums = nums.slice(0,m).concat(nums[m]/nums[m+1]).concat(nums.slice(m+2));
            }else {
            nums = nums.slice(0,m).concat(nums[m]/nums[m+1]);
            }
            ops = ops.slice(0,m).concat(ops.slice(m+1));
            m = ops.indexOf('/');
        }
        m = ops.indexOf('x');
        while(ops.indexOf('x')>=0){
            if(nums[m+1]){
            nums = nums.slice(0,m).concat(nums[m]*nums[m+1]).concat(nums.slice(m+2));
            }else {
            nums = nums.slice(0,m).concat(nums[m]*nums[m+1]);
            }
            ops = ops.slice(0,m).concat(ops.slice(m+1));
            m = ops.indexOf('x');
        }
        m = ops.indexOf('+');
        while(ops.indexOf('+')>=0){
            if(nums[m+1]){
            nums = nums.slice(0,m).concat(nums[m]+nums[m+1]).concat(nums.slice(m+2));
            }else {
            nums = nums.slice(0,m).concat(nums[m]+nums[m+1]);
            }
            ops = ops.slice(0,m).concat(ops.slice(m+1));
            m = ops.indexOf('+');
        }
        return nums;
    }
    else{
        return 0;
    }
}

ReactDOM.render(<Calculator/>,document.getElementById('root'))
