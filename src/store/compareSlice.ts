import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Device {
  id: number;
  name: string;
}

export type DeviceType = 'phone' | 'tablet' | 'accessory' | null; 

interface CompareState {
  comparedDevices: Device[];
  deviceType: DeviceType;
}

const initialState: CompareState = {
  comparedDevices: [],
  deviceType: null,
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addDeviceToCompare: (
      state,
      action: PayloadAction<{ device: Device; deviceType: DeviceType }>
    ) => {
      const { device, deviceType } = action.payload;

      if (state.comparedDevices.length >= 2) {
        console.error('You cannot compare more than two devices');
        return;
      }

      if (state.deviceType !== null && state.deviceType !== deviceType) {
        state.comparedDevices = [device];
        state.deviceType = deviceType;
      } else if (!state.comparedDevices.some((d) => d.id === device.id)) {
        state.comparedDevices.push(device);
      }
    },

    removeDeviceFromCompare: (state, action: PayloadAction<number>) => {
      const deviceId = action.payload;
      state.comparedDevices = state.comparedDevices.filter(
        (device) => device.id !== deviceId
      );

      if (state.comparedDevices.length === 0) {
        state.deviceType = null;
      }
    },

    clearComparedDevices: (state) => {
      state.comparedDevices = [];
      state.deviceType = null;
    },
  },
});

export const {
  addDeviceToCompare,
  removeDeviceFromCompare,
  clearComparedDevices,
} = compareSlice.actions;


export default compareSlice.reducer;
