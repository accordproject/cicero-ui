/* Styling */
import styled from 'styled-components';

export const NavigationWrapper = styled.div`
    max-height: ${props => props.navMaxHeight || '80vh'};
    width: ${props => props.navWidth || '180px'};
    overflow-y: inherit;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 20px 1fr;
    grid-template-areas: "navigation files" "body body";
`;

export const Title = styled.a`
    place-self: center;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: bold;
    font-family: ${props => props.headerFont || 'Graphik'};
    &:hover {
        cursor: pointer;
        color: ${props => props.titleActive || '#19C6C7'};
    }
`;

export const Navigation = styled(Title)`
    display: grid;
    grid-area: navigation;
    color: ${props => (props.navState === 'NAVIGATION'
    ? (props.titleActive || '#19C6C7')
    : (props.titleInactive || '#86888D'))};
`;

export const Files = styled(Title)`
    display: grid;
    grid-area: files;
    color: ${props => (props.navState === 'FILES'
    ? (props.titleActive || '#19C6C7')
    : (props.titleInactive || '#86888D'))};
`;
