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
    marginBottom: 1,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 2,
    nowrap: "nowrap",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontWeight: "normal"
  },
  tableNoBorderCell: {
    flex: 1,
    padding: 2,
    nowrap: "nowrap",
  },
  tableNoCell: {
    width: "5%",
    padding: 2,
    nowrap: "nowrap",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontWeight: "normal"
  },
  tableNoBorderCellIndex: {
    width: "5%",
    padding: 2,
    nowrap: "nowrap",
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
function OrderInvoiceDownload({ order }) {
  const calculateSubtotal = () =>
    order.order_details.reduce((total, item) => total + item.quantity * item.price, 0);
  const vat = (calculateSubtotal() * 0) / 100;
  const grandTotal = calculateSubtotal() - 0 + 0 + 0;
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
              Moriyam Paper Ltd
            </Text>
          </View>
          <View style={styles.textCenter}>
            <Text style={styles.textGray}>
              Road: 5, House:16, Sector:10, Dhaka.
            </Text>
          </View>
        </View>
        <View style={[styles.grid, { paddingTop: "8px" }]}>
          <View>
            <Text style={{ fontWeight: "bold", color: "#444" }}>
              Bill to :
            </Text>
            <Text style={{ color: "#444" }}>
              {order.customer.name}
              {"\n"}
              Mobile: {order.customer.phone}
            </Text>
            {order?.customer?.email && <Text style={{ color: "#444" }}>Email: {order.customer.email}</Text>}
          </View>
          <View style={styles.textRight}>
            <Text style={{ fontWeight: "bold", color: "#444" }}>Invoice No: {order.order_no}</Text>
            <Text>
              Invoice date: <Text style={{ color: "#444" }}>{order.order_date}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={[styles.tableNoCell]}>#</Text>
            <Text style={[styles.tableCell, styles.textRight]}>Item</Text>
            <Text style={[styles.tableCell, styles.textRight]}>Quantity</Text>
            <Text style={[styles.tableCell, styles.textRight]}>Price</Text>
            <Text style={[styles.tableCell, styles.textRight]}>Total</Text>
          </View>
          {order.order_details.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableNoCell}>
                <Text style={{ fontWeight: "bold" }}>{index + 1}</Text>
              </Text>
              <Text style={[styles.tableCell, styles.textRight]}>{item?.product.name}</Text>
              <Text style={[styles.tableCell, styles.textRight]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, styles.textRight]}>{item.price}</Text>
              <Text style={[styles.tableCell, styles.textRight]}>{(item.quantity * item.price)}</Text>
            </View>
          ))}
          <View style={styles.tableRow}>
            <Text style={styles.tableNoBorderCellIndex}></Text>
            <Text style={[styles.tableNoBorderCell, styles.textRight]}></Text>
            <Text style={[styles.tableNoBorderCell, styles.textRight]}></Text>
            <Text style={[styles.tableNoBorderCell, styles.textRight]}>
              Subtotal
            </Text>
            <Text style={[styles.tableCell, styles.textRight]}>
              {calculateSubtotal()}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableNoBorderCellIndex}></Text>
            <Text style={[styles.tableNoBorderCell, styles.textRight]}></Text>
            <Text style={[styles.tableNoBorderCell, styles.textRight]}></Text>
            <Text style={[styles.tableNoBorderCell, styles.textRight]}>
              Tax
            </Text>
            <Text style={[styles.tableCell, styles.textRight]}> {vat}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableNoBorderCellIndex}></Text>
            <Text style={[styles.tableNoBorderCell, styles.textRight]}></Text>
            <Text style={[styles.tableNoBorderCell, styles.textRight]}></Text>
            <Text style={[styles.tableNoBorderCell, styles.textRight]}>
              Discount
            </Text>
            <Text style={[styles.tableCell, styles.textRight]}>- 0</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableNoBorderCellIndex}></Text>
            <Text style={[styles.tableNoBorderCell, styles.textRight]}></Text>
            <Text style={[styles.tableNoBorderCell, styles.textRight]}></Text>
            <Text style={[styles.tableNoBorderCell, styles.textRight]}>
              Total
            </Text>
            <Text style={[styles.tableCell, styles.textRight]}>
              {grandTotal}
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
