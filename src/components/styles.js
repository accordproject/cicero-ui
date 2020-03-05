import styled from 'styled-components';
import './index.css';

export const ClauseWrapper = styled.div`
  position: relative;
  margin: 10px -10px;
  display: grid;
  grid-template-columns: 10px 375px 1fr 25px 25px 25px 10px;
  grid-template-rows: 11px 11px 1fr;
  grid-template-areas: "one two three four five six seven"
                       "eight nine ten eleven twelve thirteen fourteen"
                       "fifteen sixteen seventeen eighteen nineteen twenty twentyone";
`;

export const ClauseConditional = styled.svg`
  visibility: ${props => (props.currentHover ? 'visible' : 'hidden')};
`;

export const ClauseConditionalTooltip = styled.div`
  display: inline;
  visibility: ${props => (props.currentHover ? 'visible' : 'hidden')};
  margin-top: -${props => props.tooltipHeight}em;

  &:before {
    content: '';
    position: absolute;
    top: ${props => props.caretTop}em;
    left: ${props => props.caretLeft - 1}px;
    border-top: 5px solid #141F3C;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }

  &:after {
    content: '';
    position: absolute;
    top: ${props => props.caretTop}em;
    left: ${props => props.caretLeft}px;
    border-top: 4px solid #141F3C;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  }
`;

export const ClauseBackground = styled.div`
  background-color: ${props => props.clausebg || '#F9FBFF'};
  grid-area: eight / eight / twentyone / twentyone;
`;

export const ClauseHeader = styled.div`
  visibility: ${props => (props.currentHover ? 'visible' : 'hidden')};
  font-family: ${props => props.headerfont || 'serif'};
  grid-area: two / two / ten / ten;
  transition-duration: 0.5s;
  background: linear-gradient(180deg, #FFFFFF 0%, ${props => props.headerbg || '#ECF0FA'} 100%);
  align-self: center;
  justify-self: start;
  margin: 6px 0;
  padding: 3px;
  color: ${props => props.headercolor || '#696969'};
  line-height: 14px;
  font-size: 0.87em;
  font-weight: 600;
`;

export const ClauseBody = styled.div`
  .variable {
    color: ${props => props.variablecolor || '#1034a6'};
  }
  .conditional {
    color: ${props => props.conditionalcolor || '#B11A00'};
  }
  .computed {
    color: ${props => props.computedcolor || '#f1baff'};
  }
  font-family: ${props => props.bodyfont || 'serif'};
  grid-area: sixteen / sixteen / twenty / twenty;
  margin: 2px 0 10px;
  padding: 10px;
  color: #141F3C;
  font-size: 1em;
  line-height: 22px;
`;

export const ClauseIcon = styled.svg`
  fill: #696969;
  cursor: pointer;

  &:hover {
    fill: ${props => props.clauseIconColor || '#19C6C7'};
  }
`;

const IconWrapper = styled.div`
  visibility: ${props => (props.currentHover ? 'visible' : 'hidden')};
  background: linear-gradient(180deg, #FFFFFF 0%, ${props => props.iconBg || '#ECF0FA'} 100%);
  padding: 4px;
  place-self: center;
  transition-duration: 0.5s;
`;

export const TestWrapper = styled(IconWrapper)`
  grid-area: four / four / eleven / eleven;
`;

export const EditWrapper = styled(IconWrapper)`
  grid-area: five / five / twelve / twelve;
`;

export const DeleteWrapper = styled(IconWrapper)`
  grid-area: six / six / thirteen / thirteen;
`;

export const ClauseAdd = styled.svg`
  fill: #46608E;
  cursor: pointer;
  grid-area: editIcon;
  place-self: center;

  &:hover {
    fill: #FFFFFF;
  }
`;


export const HeaderToolTipWrapper = styled.div`
  position: absolute;
  top: -25px;
`;

export const HeaderToolTip = styled.div`
  background-color: #141f3a;
  border-radius: 3px;
  padding: 5px;
  :after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 5px;
    border-width: 4px;
    border-style: solid;
    border-color: #141f3a transparent transparent transparent;
  }
`;

export const HeaderToolTipText = styled.span`
`;
