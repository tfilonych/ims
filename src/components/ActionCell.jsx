import {
  Save as SaveIcon,
  Close as CancelIcon,
  Edit as EditIcon,
  DeleteOutlined as DeleteIcon,
  AddShoppingCart as AddShoppingCartIcon,
} from '@mui/icons-material';

const ActionCell = ({
  isInEditMode,
  allowedActions,
  id,
  editHandler,
  purchaseHandler,
  cancelHandler,
  removeHandler,
  saveHandler,
}) => {
  return (
    <>
      {isInEditMode ? (
        <>
          <SaveIcon onClick={() => saveHandler(id)} />
          <CancelIcon onClick={cancelHandler} />
        </>
      ) : (
        <>
          {allowedActions?.edit && <EditIcon onClick={() => editHandler(id)} />}
          {allowedActions?.remove && (
            <DeleteIcon onClick={() => removeHandler(id)} />
          )}
          {allowedActions?.purchase && (
            <AddShoppingCartIcon onClick={() => purchaseHandler(id)} />
          )}
        </>
      )}
    </>
  );
};

export default ActionCell;
