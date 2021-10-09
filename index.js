"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Calculator = /*#__PURE__*/function (_React$Component) {
  _inherits(Calculator, _React$Component);

  var _super = _createSuper(Calculator);

  function Calculator(props) {
    var _this;

    _classCallCheck(this, Calculator);

    _this = _super.call(this, props);
    _this.state = {
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
      lops: []
    };
    _this.reset = _this.reset.bind(_assertThisInitialized(_this));
    return _this;
  } // called when numbers are clicked


  _createClass(Calculator, [{
    key: "handleNums",
    value: function handleNums(i) {
      //if = is clicked the a number is clicked reset values
      if (this.state.inputs.indexOf('=') !== -1) {
        this.setState({
          nums: [],
          ops: [],
          crntN: '',
          inputs: '',
          lresult: 0,
          message: ''
        });
      } // always update crntN when inputing numbers


      this.setState({
        crntN: this.state.crntN + i
      }); //but if the number starts with 0 and there is no . keep the actual value

      if (this.state.crntN.match(/^0/) && this.state.crntN.indexOf(".") === -1) {
        this.setState({
          crntN: this.state.crntN
        });
      }
    } // called when operators are clicked

  }, {
    key: "handleOps",
    value: function handleOps(i) {
      //when an operator is clicked after changing crntN value :
      if (this.state.crntN) {
        //when clicking - following immediatly by an operator
        if (this.state.crntN === '-' && (i === "x" || i === "/" || i === "+")) {
          this.setState({
            inputs: this.state.inputs + this.state.crntN + i,
            crntN: '',
            //cancel the last operator
            ops: this.state.ops.slice(0, this.length - 1).concat(i)
          });
        } else {
          //when inputing a valid number
          if (Number(this.state.crntN) || Number(this.state.crntN) === 0) {
            this.setState({
              //store it in nums
              nums: this.state.nums.concat(Number(this.state.crntN)),
              //and store the current operator in ops
              ops: this.state.ops.concat(i)
            });
          } else {
            //number unvalid : show error ex: ".+="
            console.log("Math format error");
            this.setState({
              message: "Math format error"
            });
          }

          this.setState({
            inputs: this.state.inputs + this.state.crntN + i,
            crntN: ''
          });
        }
      } else {
        //if an operator immediatly after getting a result
        if (this.state.lresult) {
          this.setState({
            //store the last result in nums
            nums: this.state.nums.concat(Number(this.state.lresult)),
            //display the last result plus the operator clicked
            inputs: this.state.lresult + i,
            //reset the last result value and the crnN
            lresult: '',
            crntN: '',
            //store the operator clicked in ops
            ops: this.state.ops.concat(i)
          });
        } else {
          // if two or more operators are entred delete the first one
          if (this.state.nums.length === 0) {
            this.setState({
              nums: this.state.nums.concat(Number(this.state.crntN)),
              inputs: this.state.inputs + this.state.crntN + i,
              ops: this.state.ops.slice(0, this.length - 1).concat(i)
            });
          } else {
            //if the operation starts whit an operator
            this.setState({
              inputs: this.state.inputs + i,
              ops: this.state.ops.slice(0, this.length - 1).concat(i)
            });
          }
        }
      }
    } //called when . clicked

  }, {
    key: "handleDecimal",
    value: function handleDecimal(i) {
      //Allow  . one time
      if (this.state.crntN.indexOf('.') === -1) {
        this.setState({
          crntN: this.state.crntN + i
        });
      }
    } //called when AC clicked

  }, {
    key: "reset",
    value: function reset() {
      // initial state
      this.setState({
        nums: [],
        ops: [],
        crntN: '',
        inputs: '',
        lresult: 0,
        message: ''
      });
    } //called when = clicked

  }, {
    key: "result",
    value: function result(i) {
      this.setState({
        //store the resull in lresult calculated by calculat function
        lresult: Number(calculat(this.state.nums.concat(Number(this.state.crntN)), this.state.ops)),
        //display the last input
        inputs: this.state.inputs + this.state.crntN + i,
        //reset
        nums: [],
        crntN: '',
        ops: []
      });
    } //called when - clicked

  }, {
    key: "negative",
    value: function negative(i) {
      //when clicking - before setting crntN
      if (this.state.crntN.indexOf('-') === -1) {
        if (!this.state.crntN) {
          //and after getting a result
          if (this.state.inputs.indexOf('=') !== -1) {
            this.setState({
              //store the last result back in the nums then
              nums: this.state.nums.concat(Number(this.state.lresult)),
              inputs: "" + this.state.lresult,
              lresult: '',
              crntN: '-',
              //store + operator
              ops: this.state.ops.concat('+')
            });
          } //if the opration starts with -
          else {
            this.setState({
              inputs: this.state.crntN,
              crntN: i
            });
          }
        } //if crntN is a valid value
        else {
          this.setState({
            //first store the crntN
            nums: this.state.nums.concat(Number(this.state.crntN)),
            inputs: this.state.inputs + this.state.crntN,
            //then assign a negative to it
            crntN: i,
            //store + operator
            ops: this.state.ops.concat('+')
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var current = this.state.crntN;
      var inputs = this.state.inputs;
      var nums = this.state.lresult;
      return /*#__PURE__*/React.createElement("div", {
        className: "container",
        id: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container",
        id: "calc"
      }, /*#__PURE__*/React.createElement("div", {
        className: "screen"
      }, inputs ? /*#__PURE__*/React.createElement("p", null, inputs) : current ? /*#__PURE__*/React.createElement("p", null, current) : /*#__PURE__*/React.createElement("p", {
        style: {
          color: "transparent"
        }
      }, "."), /*#__PURE__*/React.createElement("p", {
        id: "display"
      }, nums ? nums : current ? current : 0)), /*#__PURE__*/React.createElement("div", {
        className: "bg-dark"
      }, /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col d-flex flex-column"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn",
        onClick: function onClick() {
          return _this2.handleOps("+");
        },
        id: "add"
      }, "+"), /*#__PURE__*/React.createElement("button", {
        className: "btn",
        onClick: function onClick() {
          return _this2.negative("-");
        },
        id: "subtract"
      }, "-")), /*#__PURE__*/React.createElement("div", {
        className: "col d-flex align-items-center"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn col",
        onClick: function onClick() {
          return _this2.result("=");
        },
        id: "equals"
      }, "=")), /*#__PURE__*/React.createElement("div", {
        className: "col d-flex flex-column"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn",
        onClick: function onClick() {
          return _this2.handleOps("/");
        },
        id: "divide"
      }, "/"), /*#__PURE__*/React.createElement("button", {
        className: "btn",
        onClick: function onClick() {
          return _this2.handleOps("x");
        },
        id: "multiply"
      }, "x"))), /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn col",
        onClick: function onClick() {
          return _this2.handleNums(1);
        },
        id: "one"
      }, "1"), /*#__PURE__*/React.createElement("button", {
        className: "btn col",
        onClick: function onClick() {
          return _this2.handleNums(2);
        },
        id: "two"
      }, "2"), /*#__PURE__*/React.createElement("button", {
        className: "btn col",
        onClick: function onClick() {
          return _this2.handleNums(3);
        },
        id: "three"
      }, "3")), /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn col",
        onClick: function onClick() {
          return _this2.handleNums(4);
        },
        id: "four"
      }, "4"), /*#__PURE__*/React.createElement("button", {
        className: "btn col",
        onClick: function onClick() {
          return _this2.handleNums(5);
        },
        id: "five"
      }, "5"), /*#__PURE__*/React.createElement("button", {
        className: "btn col",
        onClick: function onClick() {
          return _this2.handleNums(6);
        },
        id: "six"
      }, "6")), /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn col",
        onClick: function onClick() {
          return _this2.handleNums(7);
        },
        id: "seven"
      }, "7"), /*#__PURE__*/React.createElement("button", {
        className: "btn col",
        onClick: function onClick() {
          return _this2.handleNums(8);
        },
        id: "eight"
      }, "8"), /*#__PURE__*/React.createElement("button", {
        className: "btn col",
        onClick: function onClick() {
          return _this2.handleNums(9);
        },
        id: "nine"
      }, "9")), /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn col",
        onClick: function onClick() {
          return _this2.handleDecimal(".");
        },
        id: "decimal"
      }, "."), /*#__PURE__*/React.createElement("button", {
        className: "btn col",
        onClick: function onClick() {
          return _this2.handleNums(0);
        },
        id: "zero"
      }, "0"), /*#__PURE__*/React.createElement("button", {
        className: "btn col",
        onClick: this.reset,
        id: "clear"
      }, "AC")))));
    }
  }]);

  return Calculator;
}(React.Component);

function calculat(nums, ops) {
  console.log(nums, ops);

  if (nums.length === ops.length + 1) {
    var m = ops.indexOf('/');

    while (ops.indexOf('/') >= 0) {
      if (nums[m + 1]) {
        nums = nums.slice(0, m).concat(nums[m] / nums[m + 1]).concat(nums.slice(m + 2));
      } else {
        nums = nums.slice(0, m).concat(nums[m] / nums[m + 1]);
      }

      ops = ops.slice(0, m).concat(ops.slice(m + 1));
      m = ops.indexOf('/');
    }

    m = ops.indexOf('x');

    while (ops.indexOf('x') >= 0) {
      if (nums[m + 1]) {
        nums = nums.slice(0, m).concat(nums[m] * nums[m + 1]).concat(nums.slice(m + 2));
      } else {
        nums = nums.slice(0, m).concat(nums[m] * nums[m + 1]);
      }

      ops = ops.slice(0, m).concat(ops.slice(m + 1));
      m = ops.indexOf('x');
    }

    m = ops.indexOf('+');

    while (ops.indexOf('+') >= 0) {
      if (nums[m + 1]) {
        nums = nums.slice(0, m).concat(nums[m] + nums[m + 1]).concat(nums.slice(m + 2));
      } else {
        nums = nums.slice(0, m).concat(nums[m] + nums[m + 1]);
      }

      ops = ops.slice(0, m).concat(ops.slice(m + 1));
      m = ops.indexOf('+');
    }

    return nums;
  } else {
    return 0;
  }
}

ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.getElementById('root'));
