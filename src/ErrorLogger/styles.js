/* Styling */
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

/* Components */
export const ErrorDisplay = styled.div`
    bottom: 25px;
    width: 100%;
    position: fixed;
    max-height: 300px;
    background-color: ${props => props.displayBackground || '#1E2D53'};
    box-shadow: ${props => props.displayShadow || '0 -2px 20px 0 rgba(20,31,60,0.65)'};
    z-index: ${props => props.zIndexInput || 'auto'};
`;

export const ErrorsHeader = styled.div`
    z-index: ${props => props.zIndexInput || 'auto'};
    width: 100%;
    position: fixed;
    bottom: ${props => (props.errors ? '0' : 'auto')};
    transition: 1s;
    height: ${props => (props.errors ? '25px' : '0')};
    padding: 0.1em 0.1em 0.1em 1em;
    background-color: ${props => props.headerBackground || '#1E2D53'};
    box-shadow: ${props => props.headerShadow || '0 -2px 20px 0 rgba(20,31,60,0.65)'};
    border-top: ${props => props.headerTop || ' 1px solid #50637F'};

    color: ${props => (props.errors ? '#FF4242' : '#19C6C7')};
    font-family: "IBM Plex Sans";
    font-size: 1em;
    font-weight: bold;
    letter-spacing: -0.5px;
    line-height: 20px;

    &:hover {
        background-color: ${props => props.headerBackgroundHover || '#364C77'};
        cursor: pointer;
    }
`;

export const ErrorSymbol = styled(Icon)`
    vertical-align: middle;
`;

export const ErrorBarArrow = styled.div`
    float: right;
    margin: 5px 15px;

    border-top: ${props => (props.errorDisplay
    ? (`7px solid ${props.headerBarArrow || '#7B9AD1'}`) : '0')};

    border-right: 4px solid transparent;

    border-left: 4px solid transparent;

    border-bottom: ${props => (props.errorDisplay
    ? '0' : (`7px solid ${props.headerBarArrow || '#7B9AD1'}`))};
`;

export const ErrorComponent = styled.div`
    width: 100%;
    color: #F0F0F0;
    border-bottom: 1px solid ${props => props.borderBottom || '#50637F'};
    padding: 10px 16px;

    display: grid;
    grid-row-gap: 20px; 
    grid-template-areas: "errorArrow errorFile errorType errorMessage"
                        "errorFull errorFull errorFull errorFull";
    grid-template-columns: 0.25fr 1fr 1fr 8fr;
    grid-template-rows: min-content auto;
`;

export const ErrorFile = styled.a`
    text-decoration: underline;

    color: ${props => props.errorFile || '#FFFFFF'};
    font-family: "IBM Plex Sans";
    font-size: 0.81em;
    line-height: 13px;

    grid-area: errorFile;
    align-self: center;
    &:hover {
        cursor: pointer;
        color: ${props => props.errorFileHover || '#0066CC'};
    }
`;

export const ErrorType = styled.div`
    grid-area: errorType;
    color: ${props => props.errorType || '#B9BCC4'};
    font-family: "IBM Plex Sans";
    font-size: 0.81em;
    line-height: 13px;
    align-self: center;
    padding: 5px;
`;

export const ErrorShortMessage = styled.div`
    grid-area: errorMessage;
    color: ${props => props.shortMessage || '#B9BCC4'};
    font-family: "IBM Plex Sans";
    font-size: 0.81em;
    line-height: 13px;
    align-self: center;
    padding: 5px;
`;

export const ErrorFullMessage = styled.div`
    grid-area: errorFull;
    color: ${props => props.fullMessage || '#FFFFFF'};
    font-family: "IBM Plex Sans";
    font-size: 0.81em;
    line-height: 13px;
`;

export const ArrowDiv = styled.div`
    grid-area: errorArrow;
    place-self: center;
    width: 0; 
    height: 0; 
    margin: 5px;

    border-top: ${props => (props.expanded
    ? (`10px solid ${props.errorArrow || '#50637F'}`) : '4px solid transparent')};

    border-right: ${props => (props.expanded ? '4px solid transparent' : '0')};

    border-bottom: ${props => (props.expanded ? '0' : '4px solid transparent')};

    border-left: ${props => (props.expanded
    ? '4px solid transparent' : (`10px solid ${props.errorArrow || '#50637F'}`))};

    &:hover {
        cursor: pointer;
    }
`;
