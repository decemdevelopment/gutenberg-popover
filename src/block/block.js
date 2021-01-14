/**
 * BLOCK: popover
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

import _ from 'lodash'

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { useState, Fragment } = wp.element;
const { RichTextToolbarButton, openModal } = wp.blockEditor;
const { registerFormatType, toggleFormat, applyFormat, removeFormat } = wp.richText;


import {
  Popover,
  TextareaControl,
  ToggleControl,
  Button,
} from "@wordpress/components";

const MyCustomButton = ({ onChange, isActive, ...props }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [allowHTML, setAllowHTML] = useState(false);
  const [popoverContent, setPopoverContent] = useState(null);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const saveModal = () => {
      onChange(
        applyFormat(props.value, {
          type: "decem-blocks/popover",
          attributes: {
            enableHTML: `${allowHTML}`,
            popoverContent: popoverContent ? popoverContent : "cant map from state",
          },
        })
      );
      setPopoverContent('');
      closeModal();
  }

  function handleAddingPopover() {
    openModal();
    if (!isActive) { // there is no popover on highlighted text
      onChange(
        applyFormat(props.value, {
          type: "decem-blocks/popover",
          attributes: {
            enableHTML: `${allowHTML}`,
            popoverContent: popoverContent ? popoverContent : "cant map from state",
          },
        })
      );
    } else { // there is already popover on highlighted text
      // When user adds text for popover, it gets saved newSavedContent
      // If user wants to edit old popover text, its value is in oldSavedContent
      const oldSavedContent = _.get(props, `value.activeFormats[0].unregisteredAttributes.popovercontent`);
      const newSavedContent = _.get(props, 'activeAttributes.popoverContent');
      
      const textAreaValue = oldSavedContent || newSavedContent;

      setPopoverContent(textAreaValue)

      onChange(
        applyFormat(props.value, {
          type: "decem-blocks/popover",
          attributes: {
            enableHTML: `${allowHTML}`,
            popoverContent: textAreaValue ? textAreaValue : "cant map from state",
          },
        })
      );
      
    }
  }

  function handleDeletingPopover() {

    closeModal();
    setPopoverContent(null);
    onChange(
      removeFormat(props.value, 'decem-blocks/popover')
    )
  }

  function handleTextArea(e) {
    setPopoverContent(e);
  }

  function handleCheckbox() {
    setAllowHTML(!allowHTML);
  }

  return (
    <Fragment>
      <RichTextToolbarButton
        icon="editor-code"
        title="Enable Popover"
        onClick={handleAddingPopover}
        isActive={isActive}
      ></RichTextToolbarButton>
      {isOpen ? (
        <Popover position="center center" onFocusOutside={closeModal}>
          <div className="popover-wrapper">
            <TextareaControl onChange={handleTextArea} value={popoverContent} />
            <ToggleControl
              label="Allow HTML"
              checked={allowHTML}
              onChange={handleCheckbox}
            />
            <Button onClick={saveModal} isPrimary className="btn">Save</Button>
            <Button onClick={handleDeletingPopover} isPrimary className="btn">Delete Popover</Button>
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
  tagName: "span",
  className: "popover",
  edit: MyCustomButton,
});
