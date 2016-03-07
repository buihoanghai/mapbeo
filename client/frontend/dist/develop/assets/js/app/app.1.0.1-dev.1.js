var tong_tien = 0;
var tong_tien1 = 0;
var nghi = 0;
var nghiwin = 0;
var tong_so_luot_choi = 0;
var tien_thua_nhieu_nhat_moi_luot = 0;
var TIME_OUT = 10000;
var test_luot = 1;
var nghi_win = 150;
var nghi_lose = -1000;
var mang_x_tien_cuoc = [1, 4, 5, 10];
var vi_tri_x_tien_cuoc = 0;
function BET_GA() {
    var MIN = 6, MAX = 240, TONG_SO_LUOT = 100;

    var mang_ca_cuoc = [];
    var tien_ca_cuoc = 0;
    var tien_ca_cuoc1 = 0;
    var ket_qua_luot_truoc;
    var so_tran_thang = 0;
    var so_tran_thua = 0;
    return {
        danh: danh
    };

    function LUOT(ga) {
        return {
            gia_ca_cuoc: MIN,
            ga: ga
        };
    }
    function lua_ga() {
        return vua_ra_gi_danh_do();
    }
    function vua_ra_gi_danh_do() {
        return {
            //  loai_ga: ket_qua_luot_truoc === 'blue'? 'red' :'blue',
            //   loai_ga: 'blue',
            loai_ga: ket_qua_luot_truoc || 'red',
            ti_gia_cuoc: 0.95
        };
    }
    function danh(thang) {
        tong_so_luot_choi++;
        tien_thua_nhieu_nhat_moi_luot = tien_thua_nhieu_nhat_moi_luot < tien_ca_cuoc ? tien_thua_nhieu_nhat_moi_luot : tien_ca_cuoc;
        if (mang_ca_cuoc.length > TONG_SO_LUOT) {
            //             console.log('cuoc ket thuc');
            //             console.log('thang: ' + so_tran_thang + ' ,thua: ' + so_tran_thua);
            //             console.log('tien ca cuoc hien tai:' + tien_ca_cuoc);
            tong_tien += tien_ca_cuoc;
            tong_tien1 += tien_ca_cuoc1;
            return;
        }
        if (tien_ca_cuoc > nghi_win) {
            //  console.log('nghi win:' + tien_ca_cuoc);
            tong_tien += tien_ca_cuoc;
            tong_tien1 += tien_ca_cuoc1;
            nghiwin++;
            return;
        }
        if (tien_ca_cuoc < nghi_lose) {
            nghi++;
            //  console.log('nghi:' + tien_ca_cuoc);
            tong_tien += tien_ca_cuoc;
            tong_tien1 += tien_ca_cuoc1;
            return;
        }

        var ga = lua_ga();
        var hien_tai = new LUOT(ga);
        var luot_truoc = mang_ca_cuoc[mang_ca_cuoc.length - 1];
        var x_tien_cuoc = mang_x_tien_cuoc[vi_tri_x_tien_cuoc];
        hien_tai.gia_ca_cuoc = MIN * x_tien_cuoc || MIN;
        if (hien_tai.gia_ca_cuoc > MAX || thang) {
            hien_tai.gia_ca_cuoc = MIN;
            vi_tri_x_tien_cuoc = 0;
        }
        console.log('vi_tri_x_tien_cuoc :' + vi_tri_x_tien_cuoc);
        mang_ca_cuoc.push(hien_tai);
        ca_cuoc(hien_tai, ga);
    }
    function ca_cuoc(hien_tai) {
        // cuoc voi gia hien tai
        console.log(' ');
        console.log(' ');
        console.log('loai ga: ' + hien_tai.ga.loai_ga);
        console.log('so tien cuoc: ' + hien_tai.gia_ca_cuoc);
        console.log('ti gia ca cuoc : ' + hien_tai.ga.ti_gia_cuoc);
        //danh xong x2
        hien_tai.time_interval =
            setInterval(function () {
                doi_ket_qua(hien_tai);
            }, 100);

    }
    function doi_ket_qua(hien_tai) {
        // delay den khi co ket qua
        clearInterval(hien_tai.time_interval);
        var result = kiem_tra_ket_qua(hien_tai);
        if (result === 'hoa') {
            console.log('hoa: ' + tien_ca_cuoc);
            danh();
        } else {


            if (result) {
                hien_tai.thang = true;

                tien_ca_cuoc += hien_tai.gia_ca_cuoc * hien_tai.ga.ti_gia_cuoc;
                tien_ca_cuoc1 -= hien_tai.gia_ca_cuoc;
                // thang
                console.log('tien_ca_cuoc: ' + tien_ca_cuoc);
                danh(true);
            } else {
                hien_tai.thang = false;
                tien_ca_cuoc1 += hien_tai.gia_ca_cuoc * hien_tai.ga.ti_gia_cuoc;
                tien_ca_cuoc -= hien_tai.gia_ca_cuoc;
                console.log('tien_ca_cuoc: ' + tien_ca_cuoc);
                vi_tri_x_tien_cuoc++;
                danh();
            }
        }
    }

    function kiem_tra_ket_qua(hien_tai) {
        var ngau_nhien = Math.floor((Math.random() * 20) + 1);
        ket_qua = ngau_nhien % 2 == 0 ? 'blue' : 'red';
        if (ngau_nhien === 7) {
            return 'hoa';
        }
        console.log('ga thang :' + ket_qua);
        if (ket_qua === hien_tai.ga.loai_ga) {
            ket_qua_luot_truoc = ket_qua;
            console.log('thang');
            so_tran_thang += 1;
            return true;
        }
        ket_qua_luot_truoc = ket_qua;
        console.log('thua');
        so_tran_thua += 1;
        return false;
    }
}
function test() {
    BET_GA().danh();
}
function test2() {

    setTimeout(function () {
        console.log('tien_thua_nhieu_nhat_moi_luot ' + tien_thua_nhieu_nhat_moi_luot);
        console.log('sau ' + test_luot + ' luot BET: ');
        console.log('tong_tien: ' + tong_tien);
        console.log('nghi: ' + nghi);
        console.log('nghiwin: ' + nghiwin);
        console.log('tong_so_luot_choi: ' + tong_so_luot_choi);
        console.log('neu danh nguoc lai: ' + tong_tien1);
        tong_tien = 0;
        tong_so_luot_choi = 0;
        tong_tien1 = 0;
        nghi = 0;
        nghiwin = 0;
    }, TIME_OUT);

    for (var i = 0; i < test_luot; i++) {
        BET_GA().danh();
    }
}

test();