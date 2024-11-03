import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Accessories } from './components/Accessories';
import { CartPage } from './components/Cart/CartPage';
import { ComparisonPage } from './components/ComparisonPage';
import { FavoriteDevices } from './components/FavoriteDevices';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { MobilePhones } from './components/MobilePhones';
import { Tablets } from './components/Tablets';
import { ScrollToTop } from './components/ScrollToTop';
import { useDataFetch } from './hooks/useDataFetch';
import { getItemsWithNumericId } from './utils/getItemsWithNumericId';
import { RootState } from './store';
import { JavaScriptTasksWithTests, LearningPage } from './components/LearningPage';
import { DeviceDetails } from './components/DeviceDetails/DeviceDetails';

const App: React.FC = () => {
  useDataFetch();

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
          <Route path="/phones" element={<MobilePhones phones={phonesData} />} />
          <Route path="/tablets" element={<Tablets tablets={tabletsData} />} />
          <Route path="/accessories" element={<Accessories accessories={accessoriesData} />} />
          <Route
            path="/phones/:id"
            element={
              <DeviceDetails
                items={getItemsWithNumericId(phonesData, productsData)}
                itemType="phone"
              />
            }
          />
          <Route
            path="/tablets/:id"
            element={
              <DeviceDetails
                items={getItemsWithNumericId(tabletsData, productsData)}
                itemType="tablet"
              />
            }
          />
          <Route
            path="/accessories/:id"
            element={
              <DeviceDetails
                items={getItemsWithNumericId(accessoriesData, productsData)}
                itemType="accessory"
              />
            }
          />
          <Route path="/favorites" element={<FavoriteDevices />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/learning/:taskId" element={<JavaScriptTasksWithTests />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
