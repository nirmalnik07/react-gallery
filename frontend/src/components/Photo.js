import React from 'react';

/**
 * Photo component will mount when rendered to the DOM.
 * @namespace Photo
 * @return {string} JSX element
 */

 /**
 * @typedef {object} Props
 * @prop {string} src
 */
const Photo = (props) => (
    <img src={props.url} alt="" />
);

export default Photo;