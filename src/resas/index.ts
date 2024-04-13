import {
    PopulationResponseType,
    PrefectureResponseType
} from "@/resas/type";

/**
 * @param API_KEYを渡せばデータ取得メソッドを返す高階関数
 */
export default function createResasClient(API_KEY: string){
    if(API_KEY.length === 0){
        throw new Error("API_KEYが設定されていません");
    }

    const RESAS_URL = "https://opendata.resas-portal.go.jp/api/v1";
    return async (category: {
        prefCodes: undefined;
        name: "prefectures"
    } | {
        name: "population",
        prefCodes: number[]
    }) => {
        if(category.name === "prefectures" && category.prefCodes !== undefined){
            throw new Error("prefecturesの場合はprefCodesを指定できません");
        }else if(category.name === "population" && category.prefCodes === undefined){
            throw new Error("populationの場合はprefCodesを指定してください");
        }else {
            if(category.name === "prefectures"){
                const response = await fetch(`${RESAS_URL}/prefectures`, {
                    headers: {
                        "X-API-KEY": API_KEY,
                        "Content-Type": "application/json; charset=utf-8"
                    }
                });
                if(!response.ok){
                    throw new Error("データの取得に失敗しました");
                }
                const PrefectureDatus =  await response.json() as PrefectureResponseType
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return PrefectureDatus;
            }else {
                const fetchURLs = category.prefCodes.map(prefCode => `${RESAS_URL}/population/composition/perYear?cityCode=-&prefCode=${prefCode}`);
                const ResponsePopulationData: PopulationResponseType[] = [];
                for(const url of fetchURLs){
                    const response = await fetch(url, {
                        headers: {
                            "X-API-KEY": API_KEY,
                            "Content-Type": "application/json; charset=utf-8"
                        }
                    });
                    if(!response.ok){
                        throw new Error("データの取得に失敗しました");
                    }
                    const PopulationData = await response.json() as PopulationResponseType;
                    ResponsePopulationData.push(PopulationData);
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return ResponsePopulationData;
            }
        }
    }
}