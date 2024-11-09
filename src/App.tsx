import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { DeviceList } from './components/DeviceList';
import { DeviceDetails } from './components/DeviceDetails/DeviceDetails';
import { CartPage } from './components/Cart/CartPage';
import { ComparisonPage } from './components/ComparisonPage';
import { FavoriteDevices } from './components/FavoriteDevices';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ScrollToTop } from './components/ScrollToTop';
import { useDataFetch } from './hooks/useDataFetch';
import { getItemsWithNumericId } from './utils/getItemsWithNumericId';
import { RootState } from './store'; 
import { JavaScriptTasksWithTests, LearningPage } from './components/LearningPage';
import { NotFoundPage } from './components/NotFoundPage';

const App: React.FC = () => {
  useDataFetch(); // Ensure data fetch on component load

  const phonesData = useSelector((state: RootState) => state.itemsData.phonesData);
  const tabletsData = useSelector((state: RootState) => state.itemsData.tabletsData);
  const accessoriesData = useSelector((state: RootState) => state.itemsData.accessoriesData);
  const productsData = useSelector((state: RootState) => state.itemsData.productsData);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col gap-8 pt-[100px]">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/phones" element={<DeviceList devices={phonesData} itemType="phones" />} />
          <Route path="/tablets" element={<DeviceList devices={tabletsData} itemType="tablets" />} />
          <Route path="/accessories" element={<DeviceList devices={accessoriesData} itemType="accessories" />} />

          <Route
            path="/phones/:id"
            element={
              <DeviceDetails items={getItemsWithNumericId(phonesData, productsData)} itemType="phones" />
            }
          />
          <Route
            path="/tablets/:id"
            element={
              <DeviceDetails items={getItemsWithNumericId(tabletsData, productsData)} itemType="tablets" />
            }
          />
          <Route
            path="/accessories/:id"
            element={
              <DeviceDetails items={getItemsWithNumericId(accessoriesData, productsData)} itemType="accessories" />
            }
          />

          {/* Other routes */}
          <Route path="/favorites" element={<FavoriteDevices />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/learning/:taskId" element={<JavaScriptTasksWithTests />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
