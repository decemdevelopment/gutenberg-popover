/**
 * BLOCK: decem-popover
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

import _ from 'lodash'

import { Icon } from '@wordpress/components'

import { useState, Fragment } from '@wordpress/element'
import { RichTextToolbarButton } from '@wordpress/block-editor'
import { registerFormatType, applyFormat, removeFormat } from '@wordpress/rich-text'
import {
  Popover,
  TextareaControl,
  ToggleControl,
  Button,
} from "@wordpress/components";

const PopperIcon = () => (
  <Icon
    icon={
      <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.286 4H5.714C4.768 4 4 4.768 4 5.714v9.143c0 .947.768 1.715 1.714 1.715h2.029l-.311 2.794a.571.571 0 00.95.487l3.647-3.282h6.257c.947 0 1.714-.767 1.714-1.714V5.714C20 4.768 19.233 4 18.286 4zm.571 10.857a.571.571 0 01-.571.572H11.81a.571.571 0 00-.383.146L8.734 18l.215-1.936a.571.571 0 00-.568-.635H5.714a.571.571 0 01-.571-.572V5.714c0-.315.256-.571.571-.571h12.572c.315 0 .571.256.571.571v9.143z" fill="#000" /></svg>
    }
  >
  </Icon>
)

const PopoverButton = ({ onChange, isActive, ...props }) => {

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
        icon={PopperIcon}
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
  edit: PopoverButton,
});