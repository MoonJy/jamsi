//감정 목록 조회
exports.selectEmotion =
    'SELECT code, name, depth, above, seq ' +
    'FROM t_emotion ' +
    'WHERE status=1 ' +
    'ORDER BY seq ASC';

//사용자 삽입
exports.join =
    'INSERT INTO t_user(uuid, os_type, os_version, p_version) ' +
    'VALUES(?, ?, ?, ?)';

//uuid에 따른 사용자 조회
//uuid
exports.selectUserByUuid =
    'SELECT uid, name ' +
    'FROM t_user ' +
    'WHERE uuid=? ';

//사용자 조회
//uid
exports.selectUser =
    'SELECT * ' +
    'FROM t_user ' +
    'WHERE uid=?';

//사용자 정보 갱신
//os_type, os_version, p_version, uid
exports.updateUser =
    'UPDATE t_user ' +
    'SET os_type=?, os_version=?, p_version=?, last_date=NOW() ' +
    'WHERE uid=?';

//사용자 토큰 값 변경
//token, uid
exports.updateToken =
    'UPDATE t_user ' +
    'SET token=? ' +
    'WHERE uid=?';

//좋아요
exports.insertLike =
    'INSERT INTO t_like(uid, pid) ' +
    'VALUES(?, ?)';

//좋아요 카운트 증가
//pid
exports.updateLikeAdd =
    'UPDATE t_poem ' +
    'SET like_cnt=like_cnt+1 ' +
    'WHERE pid=?';

//좋아요 카운트 감소
//pid
exports.updateLikeDel =
    'UPDATE t_poem ' +
    'SET like_cnt=like_cnt-1 ' +
    'WHERE pid=?';

//좋아요 취소
//uid, pid
exports.deleteLike =
    'DELETE FROM t_like ' +
    'WHERE uid=? AND pid=?';

//구독
exports.insertSubs =
    'INSERT INTO t_subscribe(uid, writer_id) ' +
    'VALUES(?, ?)';

//구독 카운트 증가
//uid
exports.updateSubsAdd =
    'UPDATE t_user ' +
    'SET subs_cnt=subs_cnt+1 ' +
    'WHERE uid=?';

//구독 삭제
//uid, writer_id
exports.deleteSubs =
    'DELETE FROM t_subscribe ' +
    'WHERE uid=? AND writer_id=?';

//구독 카운트 감소
//uid
exports.updateSubsDel =
    'UPDATE t_user ' +
    'SET subs_cnt=subs_cnt-1 ' +
    'WHERE uid=?';

//시 쓰기
exports.insertPoem =
    'INSERT INTO t_poem(uid, emotion_code, emotion_name, title, content, create_date, update_date, public) ' +
    'VALUES(?, ?, ?, ?, ?, now(), now(), ?)';

//시 수정
//title, content, public, pid
exports.updatePoem =
    'UPDATE t_poem ' +
    'SET title=?, content=?, update_date=now(), public=? ' +
    'WHERE pid=?';

//시 삭제
//pid
exports.deletePoem =
    'UPDATE t_poem ' +
    'SET delete_date=now() ' +
    'WHERE pid=?';

//감정코드에 따른 시 목록 조회
//emotion_code, page, limit
exports.selectPoemsByEmotion =
    'SELECT pid, uid, ' +
    '(SELECT name FROM t_user u where u.uid=p.uid) AS name, ' +
    'emotion_name, title, content, update_date ' +
    'FROM t_poem p ' +
    'WHERE emotion_code=? AND public=1 AND delete_date IS NULL ' +
    'ORDER BY update_date DESC ' +
    'LIMIT ?, ?';

//한 사용자가 작성한 시 목록 조회
//uid, page, limit
exports.selectPoemsByUser =
    'SELECT pid, emotion_name, title, content, update_date ' +
    'FROM t_poem ' +
    'WHERE uid=? AND delete_date IS NULL ' +
    'ORDER BY update_date DESC ' +
    'LIMIT ?, ?';

//감정코드에 따른 많이 쓰인 감정 이름 조회
//emotion_code, limit
exports.selectEmotionNameByCode =
    'SELECT DISTINCT emotion_name, ' +
    '   (SELECT COUNT(emotion_name) ' +
    '   FROM t_poem pp ' +
    '   WHERE p.emotion_name=pp.emotion_name) AS cnt ' +
    'FROM t_poem p ' +
    'WHERE emotion_code=? ' +
    'ORDER BY cnt DESC ' +
    'LIMIT ?';

//신고
exports.insertReport =
    'INSERT INTO t_report(uid, pid, description) ' +
    'VALUES(?, ?, ?);';

//신고 카운트 증가
//pid
exports.updateReportAdd =
    'UPDATE t_poem ' +
    'SET report_cnt=report_cnt+1 ' +
    'WHERE pid=?';

//신고 삭제
//uid, pid
exports.deleteReport =
    'DELETE FROM t_report ' +
    'WHERE uid=? AND pid=?';

//신고 카운트 감소
//pid
exports.updateReportDel =
    'UPDATE t_poem ' +
    'SET report_cnt=report_cnt-1 ' +
    'WHERE pid=?';


