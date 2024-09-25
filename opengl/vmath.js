 function generateRotationMatrix(rX, rY, rZ) {
    let sX = Math.sin(rX);
    let sY = Math.sin(rY);
    let sZ = Math.sin(rZ);
    let cX = Math.cos(rX);
    let cY = Math.cos(rY);
    let cZ = Math.cos(rZ);

    let resultMat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    resultMat4[0] = cZ * cY;
    resultMat4[1] = cZ * sY * sX - sZ * cX;
    resultMat4[2] = cZ * sY * cX + sZ * sX;

    resultMat4[4] = sZ * cY;
    resultMat4[5] = sZ * sY * sX + cZ * cX;
    resultMat4[6] = sZ * sY * cX - cZ * sX;

    resultMat4[8] = -sY;
    resultMat4[9] = cY * sX;
    resultMat4[10] = cY * cX;

    resultMat4[15] = 1;
    return resultMat4
}

function generateTranslationMatrix(x,y,z){
    return [
        1, 0, 0, y,
        0, 1, 0, x,
        0, 0, 1, z,
        0, 0, 0, 1];

}