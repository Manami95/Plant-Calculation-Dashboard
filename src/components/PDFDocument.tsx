"use client";

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: { padding: 30 },
  text: { fontSize: 12, marginBottom: 10 },
})

const PDFDocument = ({ userData, plantData, equipmentData, totalCost }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.text}>User: {userData.name}</Text>
        <Text style={styles.text}>Plant Type: {plantData.type}</Text>
        <Text style={styles.text}>Equipment Count: {Object.keys(equipmentData).length}</Text>
        <Text style={styles.text}>Total Cost: {totalCost}</Text>
      </View>
    </Page>
  </Document>
)

export default PDFDocument

