<?php
header("Content-type: application/json");
if (isset($_POST["text"])) {
    $text = $POST["text"];

    $result = [];

    $hashes = ["md5", "sha1", "sha256", "sha512"];
    foreach ($hashes as $hash) {
        $result[$hash] = hash($hash, $text);
    }

    if ($_POST["bcrypt_argon"] == "1") {
        $result["Bcrypt"] = password_hash($text, PASSWORD_BCRYPT);
        $result["Argon2id"] = password_hash($text, PASSWORD_ARGON2ID);
    }

    die(json_encode(["success"=>true,"result"=>$result]));
}
die(json_encode(["success"=>false,"result"=>null]));
?>