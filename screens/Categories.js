import { View, Text, SafeAreaView, } from 'react-native';
import React from 'react';
import CategoryItems from '../components/HomeComponents/CategoriesComponents/CategoryItems';
import TotalExpense from '../components/HomeComponents/CategoriesComponents/TotalExpense';

export default function Categories() {

  return (
    <SafeAreaView>
      <CategoryItems />
      <TotalExpense />
    </SafeAreaView>
  );
}
