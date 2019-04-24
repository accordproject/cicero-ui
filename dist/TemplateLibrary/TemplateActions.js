"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _semanticUiReact = require("semantic-ui-react");

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  float: right;\n  width: 40%;\n  font-size: 12px;\n  font-weight: 300;\n  text-align: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 60%;\n  border-right: 1px solid #E1E5EB;\n  cursor: pointer;\n  &:hover {\n    color: #3087CB;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  padding: 5px 10px;\n  display: inline-block;\n  color: #484848;\n  font-family: \"IBM Plex Sans\";\n  font-size: 12px;\n  font-weight: bold;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  padding: 0 !important;\n  background-color: #F9F9F9 !important;\n  max-height: 30px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ActionsContainer = (0, _styledComponents["default"])(_semanticUiReact.Card.Content)(_templateObject());

var TemplateBtn = _styledComponents["default"].a(_templateObject2());

var AddToContractBtn = (0, _styledComponents["default"])(TemplateBtn)(_templateObject3());
var DetailsBtn = (0, _styledComponents["default"])(TemplateBtn)(_templateObject4());
/**
 * A Template Actions component that will provide each template
 * with functionality.
 */

var TemplateActions =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(TemplateActions, _React$Component);

  function TemplateActions() {
    (0, _classCallCheck2["default"])(this, TemplateActions);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TemplateActions).apply(this, arguments));
  }

  (0, _createClass2["default"])(TemplateActions, [{
    key: "render",

    /**
       * Render this React component
       * @return {*} the react component
    */
    value: function render() {
      var _this = this;

      return _react["default"].createElement(ActionsContainer, null, _react["default"].createElement("div", null, _react["default"].createElement(AddToContractBtn, {
        onClick: function onClick() {
          return _this.props.addToCont(_this.props.uriKey);
        }
      }, _react["default"].createElement(_semanticUiReact.Icon, {
        name: "plus"
      }), "Add to contract"), _react["default"].createElement(DetailsBtn, {
        onClick: function onClick() {
          return _this.props.handleViewDetails(_this.props.uriKey);
        }
      }, "Details")));
    }
  }]);
  return TemplateActions;
}(_react["default"].Component);
/**
 * The property types for this component
 */


TemplateActions.propTypes = {
  addToCont: _propTypes["default"].func,
  handleViewDetails: _propTypes["default"].func,
  uriKey: _propTypes["default"].string
};
var _default = TemplateActions;
exports["default"] = _default;