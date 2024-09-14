import PropTypes from "prop-types";
import { GrValidate } from "react-icons/gr";

export const ValidationCodeInput = ({ validationCode, setValidationCode }) => {
	return (
		<>
			<div className="pb-2">
				<label
					htmlFor="validationCode"
					className="block mb-2 text-sm font-medium text-[#111827]"
				>
					Codigo de validación
				</label>
				<div className="relative text-gray-400">
					<span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
						<GrValidate />
					</span>
					<input
						type="number"
						name="validationCode"
						id="validationCode"
						value={validationCode}
						onChange={(e) => setValidationCode(e.target.value)}
						className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
						placeholder="123456"
						autoComplete="off"
					/>
				</div>
			</div>
		</>
	);
};

ValidationCodeInput.propTypes = {
	validationCode: PropTypes.string.isRequired,
	setValidationCode: PropTypes.func.isRequired,
};
