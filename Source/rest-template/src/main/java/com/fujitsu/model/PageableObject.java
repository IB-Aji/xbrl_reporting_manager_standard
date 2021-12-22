package com.fujitsu.model;

public class PageableObject<T> {

    private int pageIndex;
    private int rowToFetch;

    private T object;

    private long totalRecords;
    private long totalPage;

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }

    public int getRowToFetch() {
        return rowToFetch;
    }

    public void setRowToFetch(int rowToFetch) {
        this.rowToFetch = rowToFetch;
    }

    public T getObject() {
        return object;
    }

    public void setObject(T object) {
        this.object = object;
    }

    public long getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(long totalRecords) {
        this.totalRecords = totalRecords;
    }

    public long getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(long totalPage) {
        this.totalPage = totalPage;
    }

}
