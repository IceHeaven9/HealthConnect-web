export const RecoveryPassForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div>
        <form>
          <label>Enter Your Email Address To Send You A Recovery Link</label>
          <input placeholder="************" />
          <button type="submit">Send Email</button>
        </form>
      </div>
    </div>
  );
};
