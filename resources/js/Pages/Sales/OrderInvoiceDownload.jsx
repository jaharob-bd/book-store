import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  page: {
    // backgroundColor: "#d11fb6",
    color: "black",
    padding: 30,
    fontSize: 12,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textRight: {
    textAlign: "right",
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 2,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 4,
    nowrap: "nowrap",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontWeight: "normal"
  },
  tableCellHeader: {
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: "#f2f2f2",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 5,
    textAlign: "center",
    fontSize: 10,
  },
  logo: {
    width: 50,
    height: 20,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 4,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  boldText: {
    marginLeft: 2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
  },
  textGray: {
    color: '#555',
    fontSize: 10,
  },
});

// Create Document Component
function OrderInvoiceDownload() {
  return (
      <Document>
        <Page size="A4" style={styles.page}>
           <View style={styles.flexCol}>
            <View style={styles.flexRow}>
              <Image
                style={styles.logo}
                src="logo.png"
              />
              <Text style={styles.boldText}>
                Hotel Rajshahi inn 
              </Text>
            </View>
            <View style={styles.textCenter}>
              <Text style={styles.textGray}>
                  188/3, Uposhohor, Boalia, Rajshahi.
              </Text>
            </View>
          </View>
          <View style={styles.grid}>
            <View>
              <Text style={{ fontWeight: "bold", color: "#444" }}>
                Bill to :
              </Text>
              <Text style={{ color: "#444" }}>
                Mohammad Ali Abdullah
                {"\n"}
                Mobile: 01730034488
              </Text>
              <Text style={{ color: "#444" }}>Email: pikin96370@leacore.com</Text>
            </View>
            <View style={styles.textRight}>
              <Text style={{ fontWeight: "bold", color: "#444" }}>Invoice No: BN-123</Text>
              <Text>
                Invoice date: <Text style={{ color: "#444" }}>03/07/2023</Text>
                {"\n"}
                Due date: <Text style={{ color: "#444" }}>31/07/2023</Text>
              </Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableCellHeader]}>
              <Text style={[styles.tableCell]}>Room Type</Text>
              <Text style={[styles.tableCell, styles.textRight]}>Number of Room</Text>
              <Text style={[styles.tableCell, styles.textRight]}>Price</Text>
              <Text style={[styles.tableCell, styles.textRight]}>Amount</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>
                <Text style={{ fontWeight: "bold" }}>Dulex - 102</Text>
              </Text>
              <Text style={[styles.tableCell, styles.textRight]}>500.0</Text>
              <Text style={[styles.tableCell, styles.textRight]}>$100.00</Text>
              <Text style={[styles.tableCell, styles.textRight]}>$5,000.00</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>
                <Text style={{ fontWeight: "bold" }}>Delux - 101</Text>
              </Text>
              <Text style={[styles.tableCell, styles.textRight]}>500.0</Text>
              <Text style={[styles.tableCell, styles.textRight]}>$100.00</Text>
              <Text style={[styles.tableCell, styles.textRight]}>$5,000.00</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>
                <Text style={{ fontWeight: "bold" }}>Super Suti - 305</Text>
              </Text>
              <Text style={[styles.tableCell, styles.textRight]}>50.0</Text>
              <Text style={[styles.tableCell, styles.textRight]}>$100.00</Text>
              <Text style={[styles.tableCell, styles.textRight]}>$500.00</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.textRight]} colSpan={3}>
                Subtotal
              </Text>
              <Text style={[styles.tableCell, styles.textRight]}>
                $10,500.00
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.textRight]} colSpan={3}>
                Tax
              </Text>
              <Text style={[styles.tableCell, styles.textRight]}>$1,050.00</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.textRight]} colSpan={3}>
                Discount
              </Text>
              <Text style={[styles.tableCell, styles.textRight]}>- 10%</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.textRight]} colSpan={3}>
                Total
              </Text>
              <Text style={[styles.tableCell, styles.textRight]}>
                $11,550.00
              </Text>
            </View>
          </View>
          <Text style={styles.footer}>
            Thank You.
          </Text>
        </Page>
      </Document>

  );
}

export default OrderInvoiceDownload;
