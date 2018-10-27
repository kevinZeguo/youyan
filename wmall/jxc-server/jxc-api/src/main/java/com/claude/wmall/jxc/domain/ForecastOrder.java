package com.claude.wmall.jxc.domain;


import net.sf.json.JSONObject;
import com.claude.wmall.commons.utils.Jsonable;

public class ForecastOrder implements Jsonable {
	private String vOrderNo;

	public String getvOrderNo() {
		return vOrderNo;
	}

	public void setvOrderNo(String vOrderNo) {
		this.vOrderNo = vOrderNo;
	}

	private Integer vDelegationID;
	public Integer getvDelegationID() {
		return vDelegationID;
	}

	public void setvDelegationID(Integer vDelegationID) {
		this.vDelegationID = vDelegationID;
	}

	private Integer vProductID;

	public Integer getvProductID() {
		return vProductID;
	}

	public void setvProductID(Integer vProductID) {
		this.vProductID = vProductID;
	}

	private java.util.Date vOrderDate;

	public java.util.Date getvOrderDate() {
		return vOrderDate;
	}

	public void setvOrderDate(java.util.Date vOrderDate) {
		this.vOrderDate = vOrderDate;
	}

	private String vPayMethod;

	public String getvPayMethod() {
		return vPayMethod;
	}

	public void setvPayMethod(String vPayMethod) {
		this.vPayMethod = vPayMethod;
	}

	private Integer vPayDeadLine;

	public Integer getvPayDeadLine() {
		return vPayDeadLine;
	}

	public void setvPayDeadLine(Integer vPayDeadLine) {
		this.vPayDeadLine = vPayDeadLine;
	}

	private String vLogistics;

	public String getvLogistics() {
		return vLogistics;
	}

	public void setvLogistics(String vLogistics) {
		this.vLogistics = vLogistics;
	}

	private Integer vBuyerID;

	public Integer getvBuyerID() {
		return vBuyerID;
	}

	public void setvBuyerID(Integer vBuyerID) {
		this.vBuyerID = vBuyerID;
	}

	private Integer vSellerID;

	public Integer getvSellerID() {
		return vSellerID;
	}

	public void setvSellerID(Integer vSellerID) {
		this.vSellerID = vSellerID;
	}

	private java.math.BigDecimal vUnitPrice;

	public java.math.BigDecimal getvUnitPrice() {
		return vUnitPrice;
	}

	public void setvUnitPrice(java.math.BigDecimal vUnitPrice) {
		this.vUnitPrice = vUnitPrice;
	}

	private java.math.BigDecimal vTotalPrice;

	public java.math.BigDecimal getvTotalPrice() {
		return vTotalPrice;
	}

	public void setvTotalPrice(java.math.BigDecimal vTotalPrice) {
		this.vTotalPrice = vTotalPrice;
	}

	private java.math.BigDecimal vAmount;

	public java.math.BigDecimal getvAmount() {
		return vAmount;
	}

	public void setvAmount(java.math.BigDecimal vAmount) {
		this.vAmount = vAmount;
	}

	private String vAmountUnit;

	public String getvAmountUnit() {
		return vAmountUnit;
	}

	public void setvAmountUnit(String vAmountUnit) {
		this.vAmountUnit = vAmountUnit;
	}

	private Integer vReceiveID;

	public Integer getvReceiveID() {
		return vReceiveID;
	}

	public void setvReceiveID(Integer vReceiveID) {
		this.vReceiveID = vReceiveID;
	}

	private java.util.Date vDeliveryDate;

	public java.util.Date getvDeliveryDate() {
		return vDeliveryDate;
	}

	public void setvDeliveryDate(java.util.Date vDeliveryDate) {
		this.vDeliveryDate = vDeliveryDate;
	}

	private java.util.Date vReceiveDate;

	public java.util.Date getvReceiveDate() {
		return vReceiveDate;
	}

	public void setvReceiveDate(java.util.Date vReceiveDate) {
		this.vReceiveDate = vReceiveDate;
	}

	private String vStatus;

	public String getvStatus() {
		return vStatus;
	}

	public void setvStatus(String vStatus) {
		this.vStatus = vStatus;
	}

	private String vPayStatus;

	public String getvPayStatus() {
		return vPayStatus;
	}

	public void setvPayStatus(String vPayStatus) {
		this.vPayStatus = vPayStatus;
	}

	private String vDeal;

	public String getvDeal() {
		return vDeal;
	}

	public void setvDeal(String vDeal) {
		this.vDeal = vDeal;
	}

	private String vReceiptCode;

	public String getvReceiptCode() {
		return vReceiptCode;
	}

	public void setvReceiptCode(String vReceiptCode) {
		this.vReceiptCode = vReceiptCode;
	}

	private String vReceiptName;

	public String getvReceiptName() {
		return vReceiptName;
	}

	public void setvReceiptName(String vReceiptName) {
		this.vReceiptName = vReceiptName;
	}

	private String vSendCode;

	public String getvSendCode() {
		return vSendCode;
	}

	public void setvSendCode(String vSendCode) {
		this.vSendCode = vSendCode;
	}

	private String vSendName;

	public String getvSendName() {
		return vSendName;
	}

	public void setvSendName(String vSendName) {
		this.vSendName = vSendName;
	}

	private java.util.Date vCancelDate;

	public java.util.Date getvCancelDate() {
		return vCancelDate;
	}

	public void setvCancelDate(java.util.Date vCancelDate) {
		this.vCancelDate = vCancelDate;
	}

	private Integer vCancelBy;

	public Integer getvCancelBy() {
		return vCancelBy;
	}

	public void setvCancelBy(Integer vCancelBy) {
		this.vCancelBy = vCancelBy;
	}

	private java.util.Date vInvalidDate;
	public java.util.Date getvInvalidDate() {
		return vInvalidDate;
	}

	public void setvInvalidDate(java.util.Date vInvalidDate) {
		this.vInvalidDate = vInvalidDate;
	}

	private Integer vInvalidBy;

	public Integer getvInvalidBy() {
		return vInvalidBy;
	}

	public void setvInvalidBy(Integer vInvalidBy) {
		this.vInvalidBy = vInvalidBy;
	}

	private String vCancelType;

	public String getvCancelType() {
		return vCancelType;
	}

	public void setvCancelType(String vCancelType) {
		this.vCancelType = vCancelType;
	}

	private String vCancelRemark;

	public String getvCancelRemark() {
		return vCancelRemark;
	}

	public void setvCancelRemark(String vCancelRemark) {
		this.vCancelRemark = vCancelRemark;
	}

	private String vInvalidType;

	public String getvInvalidType() {
		return vInvalidType;
	}

	public void setvInvalidType(String vInvalidType) {
		this.vInvalidType = vInvalidType;
	}

	private String vInvalidlRemark;

	public String getvInvalidlRemark() {
		return vInvalidlRemark;
	}

	public void setvInvalidlRemark(String vInvalidlRemark) {
		this.vInvalidlRemark = vInvalidlRemark;
	}

	@Override
	public String getJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("vOrderNo", getvOrderNo());
		jsonObject.put("vDelegationID", getvDelegationID());
		jsonObject.put("vProductID", getvProductID());
		jsonObject.put("vOrderDate", getvOrderDate());
		jsonObject.put("vPayMethod", getvPayMethod());
		jsonObject.put("vPayDeadLine", getvPayDeadLine());
		jsonObject.put("vLogistics", getvLogistics());
		jsonObject.put("vBuyerID", getvBuyerID());
		jsonObject.put("vSellerID", getvSellerID());
		jsonObject.put("vUnitPrice", getvUnitPrice());
		jsonObject.put("vTotalPrice", getvTotalPrice());
		jsonObject.put("vAmount", getvAmount());
		jsonObject.put("vAmountUnit", getvAmountUnit());
		jsonObject.put("vReceiveID", getvReceiveID());
		jsonObject.put("vDeliveryDate", getvDeliveryDate());
		jsonObject.put("vReceiveDate", getvReceiveDate());
		jsonObject.put("vStatus", getvStatus());
		jsonObject.put("vPayStatus", getvPayStatus());
		jsonObject.put("vDeal", getvDeal());
		jsonObject.put("vReceiptCode", getvReceiptCode());
		jsonObject.put("vReceiptName", getvReceiptName());
		jsonObject.put("vSendCode", getvSendCode());
		jsonObject.put("vSendName", getvSendName());
		jsonObject.put("vCancelDate", getvCancelDate());
		jsonObject.put("vCancelBy", getvCancelBy());
		jsonObject.put("vInvalidDate", getvInvalidDate());
		jsonObject.put("vInvalidBy", getvInvalidBy());
		jsonObject.put("vCancelType", getvCancelType());
		jsonObject.put("vCancelRemark", getvCancelRemark());
		jsonObject.put("vInvalidType", getvInvalidType());
		jsonObject.put("vInvalidlRemark", getvInvalidlRemark());
		return jsonObject.toString();
	}
}
