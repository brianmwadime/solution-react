import React from 'react';
import { Button, Modal } from 'Components';
import { confirmable } from 'react-confirm';

const Confirmation = ({
  show,
  proceed,
  header = 'Confirm',
  confirmation = 'Are you sure?',
  cancelButton = "Cancel",
  confirmButton = "Proceed",
}) => {
  React.useEffect(() => {
    const handleEsc = (e) => (e.key === 'Escape' || e.key === 'Esc') && proceed(false);
    document.addEventListener('keydown', handleEsc, false);

    return () => {
      document.removeEventListener('keydown', handleEsc, false);
    }
  }, [])
  return (
    <Modal
      open={show}
      onClose={() => proceed(false)}
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <p>{confirmation}</p>
      </Modal.Content>
      <Modal.Footer>
        <Button
          onClick={() => proceed(true)}
          variant="FillTealA400"
          className="mr-2">
          {confirmButton}
        </Button>

        <Button
          onClick={() => proceed(false)}>
          {cancelButton}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default confirmable(Confirmation);