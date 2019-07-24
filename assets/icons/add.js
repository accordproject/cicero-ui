import React from 'react';

export const type = () => 'add';

export const icon = () => (
    <svg>
        <defs>
            <circle id="path-1" cx="7" cy="7" r="7"></circle>
            <filter x="-25.0%" y="-17.9%" width="150.0%" height="150.0%" filterUnits="objectBoundingBox" id="filter-2">
                <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.14 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
            </filter>
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="add/remove-files-expanded" transform="translate(-202.000000, -709.000000)" fillRule="nonzero">
                <g id="add-hover" transform="translate(204.000000, 710.000000)">
                    <g id="Oval">
                        <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                        <use fill="#FFFFFF" xlinkHref="#path-1"></use>
                    </g>
                    <polygon id="+" fill="#46608E" points="6.24723247 6.24723247 6.24723247 3 7.75276753 3 7.75276753 6.24723247 11 6.24723247 11 7.75276753 7.75276753 7.75276753 7.75276753 11 6.24723247 11 6.24723247 7.75276753 3 7.75276753 3 6.24723247"></polygon>
                </g>
            </g>
        </g>
    </svg>
);
