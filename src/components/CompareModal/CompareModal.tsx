import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { RootState } from '../../store/store';
import { removeDeviceFromCompare } from '../../store/compareSlice';

interface CompareModalProps {
  closeModal: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { comparedDevices } = useSelector((state: RootState) => state.compare);
  const navigate = useNavigate();
  const slideRef = useRef<HTMLDivElement>(null);

  const isModalVisible = comparedDevices.length > 0;

  const handleCompareNowClick = () => {
    if (comparedDevices.length === 2) {
      navigate('/comparison');
    }
  };

  return ReactDOM.createPortal(
    <CSSTransition
      in={isModalVisible}
      timeout={500}
      classNames="slide"
      nodeRef={slideRef}
      unmountOnExit
    >
      <div
        ref={slideRef}
        className="fixed bottom-0 right-0 w-full max-w-[400px] z-50 p-4 bg-white shadow-lg rounded-md border border-solid border-gray-300"
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <div className="flex gap-4 items-start justify-start px-4 mb-2">
          {comparedDevices.map((device) => (
            <div
              key={device.id}
              className="relative flex flex-col items-center w-[120px] p-2 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              {device.images && device.images[0] ? (
                <img
                  src={`/${device.images[0]}`}
                  alt={device.name}
                  className="w-[80px] h-[100px] object-contain mb-2"
                />
              ) : (
                <div className="w-[80px] h-[100px] bg-gray-200 flex items-center justify-center mb-2">
                  No image available
                </div>
              )}

              <div className="text-center text-sm font-semibold min-h-[40px] flex items-center justify-center">
                {device.name}
              </div>

              <button
                className="absolute top-0 right-0 bg-white rounded-full p-1 text-gray-600 hover:text-gray-900"
                onClick={() => dispatch(removeDeviceFromCompare(device.id))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <div className="h-12">
            {comparedDevices.length === 2 && (
              <button
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md transition hover:bg-blue-600"
                onClick={handleCompareNowClick}
              >
                <span>Compare</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('modal-root') as HTMLElement,
  );
};
