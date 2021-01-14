/**
 * BLOCK: popover
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { useState, Fragment } = wp.element;
const { RichTextToolbarButton, openModal } = wp.blockEditor;
const { registerFormatType, toggleFormat } = wp.richText;

import {
  Button,
  Popover,
  TextareaControl,
  ToggleControl,
} from "@wordpress/components";

const MyCustomButton = ({ onChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allowHTML, setAllowHTML] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  function handleButton() {
    onChange(
      toggleFormat(props.value, {
        type: "decem-blocks/popover",
        attributes: {
          QWERTY: "QWERTY",
        },
      })
    );
    openModal();
  }

  function handleCheckbox() {
    setAllowHTML(!allowHTML);
  }

  return (
    <Fragment>
      <RichTextToolbarButton
        icon="editor-code"
        title="Enable Popover"
        onClick={handleButton}
        isActive={isOpen}
      ></RichTextToolbarButton>
      {isOpen ? (
        <Popover position="center center" onFocusOutside={closeModal}>
          <div className="popover-wrapper">
            <TextareaControl />
            <ToggleControl
              label="Allow HTML"
              checked={allowHTML}
              onChange={handleCheckbox}
            />
          </div>
        </Popover>
      ) : (
        ""
      )}
    </Fragment>
  );
};

registerFormatType("decem-blocks/popover", {
  title: "Sample output",
  tagName: "button",
  className: "popover",
  edit: MyCustomButton,
});
