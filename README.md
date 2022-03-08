# react-jet-modal

A lightweight React.js modal package built with some cool CSS powered transitions.

## Author

- [@thisisgazzar](https://www.github.com/thisisgazzar)

## Table of Contents

* [Installation](#installation)
* [Example](#example)
* [Props](#props)

## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install --save react-jet-modal
    $ yarn add react-jet-modal


## Example

Here is a simple example:

```jsx
import React, { useState } from 'react'
import styled from "styled-components";
import { Modal } from 'react-jet-modal';

const ModalContent = styled.div`
    padding: 10px;
    width: 600px;
    height: 400px;
    text-align: center;
`
const ModalContentTitle = styled.h2`
    font-size: 15px;
`
const ModalButton = styled.button`
    cursor: pointer;
`
export default function App() {
    const [isOpen, setIsOpen] = useState(false)
    return(
        <>
            <ModalButton onClick={() => setIsOpen(true)}>Open Modal</ModalButton>

            <Modal open={isOpen}>
                <ModalContent>
                    <ModalContentTitle>React Animated Modal</ModalContentTitle>
                    <ModalButton onClick={() => setIsOpen(false)}>Close Modal</ModalButton>
                </ModalContent>
            </Modal>
        </>

    );
}
```

## Props

- `open`: Controls the modal status(takes a boolean `true` or `false`).
- `onClose`: Takes the modal closing event.
- `modalClassName`: Add custom className to the modal.
- `overlayClassName`: Add custom className to the overlay.
- `modalAnimateClassName`: Add animation className. `modal-animated-fadeInDown` and `modal-animated-zoomIn` are the only supported animations at the moment.
- `closeOnOuterClick`: Close modal on clicking anywhere outside the modal container(takes a boolean `true` or `false`).
- `closeOnEsc`: Close modal on pressing Escape on the keyboard(takes a boolean `true` or `false`).
- `overlayBackgroundColor`: Assign a background color to the overlay(`rgba(0, 0, 0, 0.8)` is default).
- `modalBackground`: Assign a background color to the modal.
- `modalBorderRadius`: Assign a border radius to the modal(`5px` is default).

`open` is a required prop! And `onClose` is required as well only if closeOnEsc or closeOnOuterClick is set to `true`.