<style>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">活动编号: </span>
                <span class="expand-value">{{ row.aid }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">活动名称:</span>
                <span class="expand-value">{{ row.title }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">所在地区:</span>
                <span class="expand-value">{{ row.city }}</span>
            </Col>
        </Row>

    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>