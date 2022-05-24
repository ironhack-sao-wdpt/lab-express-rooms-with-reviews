function FormButton(props) {
  return (
    <div className="mt-3">
      <button type="submit" className="btn btn-primary btn-lg">
        {props.children}
      </button>
    </div>
  );
}

export default FormButton;
