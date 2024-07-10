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
  saveHandler,
  cancelHandler,
  editHandler,
  deleteHandler,
  purchaseHandler,
  id,
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
            <DeleteIcon onClick={() => deleteHandler(id)} />
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
