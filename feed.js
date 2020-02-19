/**
 * Copyrightⓒ2020 by Moon Hanju (github.com/it-crafts)
 * All rights reserved. 무단전재 및 재배포 금지.
 * All contents cannot be copied without permission.
 */

// 보이면 src를 data-src로 갈아 끼우면 된다.
const common = (() => {
  const IMG_PATH = "https://leeeso93.github.io/lesson/img";
  const fetchApiData = async (url, page = "info") => {
    const res = await fetch(url + page);
    const data = await res.json();
    return data.data;
  };

  return { IMG_PATH, fetchApiData };
})();

// 부모 컴포넌트가 자식 컴포넌트를 직접 들고 있는 형태
const Root = selector => {
  let $el; // 자기 자신
  let $page; // 자식 컴포넌트

  const create = () => {
    // 자식 컴포넌트 생성
    $el = document.querySelector(selector); // 자기 자신이 뭔지 찾고
    $page = Timeline($el); //자식이 뭔지 찾고
    $page.create(); // 자식을 그린다.
  };

  const destroy = () => {
    $page && $page.destroy();
  };

  return { $el, create, destroy }; // 나 자신과, create, destory를 리턴
};

const Timeline = $parent => {
  const URL = "https://my-json-server.typicode.com/leeeso93/lesson/timeline/"; // json데이터
  let $el; // 자기 자신
  let $profile; // 자식
  let $content; // 자식

  const create = async () => {
    // 그린다.
    render(); // html 임
    $el = $parent.firstElementChild;
    const [totalPage, profileData] = await fetch();
    $profile = TimelineProfile($el, profileData); //실행 주제 이동
    $profile.create();
    $content = TimelineContent($el, URL, profileData, totalPage);
    $content.create();
  };

  const destroy = () => {
    // 자식 컴포넌트가 존재하면 destory
    $profile && $profile.destroy();
    $content && $content.destroy();
    // 자기자신(부모) 제거
    $parent.removeChild($el);
  };

  const fetch = async () => {
    const infoData = await common.fetchApiData(URL);
    const totalPage = infoData.totalPage * 1;
    const profileData = infoData.profile;
    return [totalPage, profileData];
  };

  const render = () => {
    $parent.innerHTML = `
            <div class="v9tJq">
                <div class="fx7hk">
                    <a class="_9VEo1 T-jvg" href="javascript:;" data-type="grid"><span aria-label="게시물" class="glyphsSpritePhoto_grid__outline__24__grey_5 u-__7"></span></a>
                    <a class="_9VEo1" href="javascript:;" data-type="feed"><span aria-label="피드" class="glyphsSpritePhoto_list__outline__24__blue_5 u-__7"></span></a>
                    <a class="_9VEo1" href="javascript:;" data-type=""><span aria-label="태그됨" class="glyphsSpriteTag_up__outline__24__grey_5 u-__7"></span></a>
                </div>
            </div>
        `;
  };

  return { $el, create, destroy };
};

const TimelineProfile = ($parent, profileData = {}) => {
  let $el; // 자기자신

  const create = () => {
    render(profileData);
    $el = $parent.firstElementChild;
  };

  const destroy = () => {
    $parent.removeChild($el);
  };

  const scaleDown = numstring => {
    const num = numstring.replace(/,/g, "");
    if (num >= 1000000) {
      return Math.floor(num / 100000) / 10 + "백만";
    }
    if (num >= 1000) {
      return Math.floor(num / 100) / 10 + "천";
    }
    return num;
  };

  const render = data => {
    $parent.insertAdjacentHTML(
      "afterbegin",
      `
            <div>
                <header class="HVbuG">
                    <div class="XjzKX">
                        <div class="RR-M- h5uC0" role="button" tabindex="0">
                            <canvas class="CfWVH" height="91" width="91" style="position: absolute; top: -7px; left: -7px; width: 91px; height: 91px;"></canvas>
                            <span class="_2dbep" role="link" tabindex="0" style="width: 77px; height: 77px;"><img alt="${
                              data.name
                            }님의 프로필 사진" class="_6q-tv" src="${
        common.IMG_PATH
      }${data.img}"></span>
                        </div>
                    </div>
                    <section class="zwlfE">
                        <div class="nZSzR">
                            <h1 class="_7UhW9 fKFbl yUEEX KV-D4 fDxYl">${
                              data.name
                            }</h1>
                            <span class="mrEK_ Szr5J coreSpriteVerifiedBadge" title="인증됨">인증됨</span>
                            <div class="AFWDX"><button class="dCJp8 afkep"><span aria-label="옵션" class="glyphsSpriteMore_horizontal__outline__24__grey_9 u-__7"></span></button></div>
                        </div>
                        <div class="Y2E37">
                            <div class="Igw0E IwRSH eGOV_ vwCYk">
                                <span class="ffKix bqE32">
                                    <span class="vBF20 _1OSdk"><button class="_5f5mN jIbKX _6VtSN yZn4P">팔로우</button></span>
                                    <span class="mLCHD _1OSdk"><button class="_5f5mN jIbKX KUBKM yZn4P"><div class="OfoBO"><div class="_5fEvj coreSpriteDropdownArrowWhite"></div></div></button></span>
                                </span>
                            </div>
                        </div>
                    </section>
                </header>
                <div class="-vDIg">
                    <h1 class="rhpdm">${data.title}</h1><br><span>${
        data.text
      }</span>
                </div>
                <ul class="_3dEHb">
                    <li class="LH36I"><span class="_81NM2">게시물 <span class="g47SY lOXF2">${
                      data.post
                    }</span></span></li>
                    <li class="LH36I"><a class="_81NM2" href="javascript:;">팔로워 <span class="g47SY lOXF2" title="${
                      data.follower
                    }">${scaleDown(data.follower)}</span></a></li>
                    <li class="LH36I"><a class="_81NM2" href="javascript:;">팔로우 <span class="g47SY lOXF2">${
                      data.follow
                    }</span></a></li>
                </ul>
            </div>
        `
    );
  };

  return { $el, create, destroy };
};

const TimelineContent = (
  $parent,
  url = "",
  profileData = {},
  totalPage = 1
) => {
  let $el;
  let $feed;

  let page = 0; // 현재 페이지를 바라보게끔 리팩토링(current page)
  const dataList = [];

  const create = async () => {
    render();
    $el = $parent.lastElementChild;
    const pageDataList = await fetch();
    $feed = Feed($el.firstElementChild, profileData, pageDataList);
    $feed.create();
    initInfiniteScroll();
  };

  const destroy = () => {
    $feed && $feed.destroy();
    $parent.removeChild($el);
  };

  const fetch = async () => {
    const pageDataList = await common.fetchApiData(url, ++page);
    dataList.push(pageDataList);
    return pageDataList;
  };

  // 무한 스크롤 구현
  const initInfiniteScroll = () => {
    // 자동 더보기로직 구현
    const $loading = $el.lastElementChild; //로딩이미지
    const io = new IntersectionObserver(
      (entryList, observer) => {
        // 가시성 관련 최신 메소드
        entryList.forEach(async entry => {
          // entry  :  가시성이 있는거

          if (!entry.isIntersecting) {
            // 나갔을때 강제 리턴
            return;
          }

          await ajaxMore(); //들어왔을때 (다음 엘리먼트가 보이는 시점)에 호출

          if (page >= totalPage) {
            // 끝난시점에
            observer.unobserve(entry.target); // 바라보기 종료
            $loading.style.display = "none"; // 마지막에만 로딩이미지가 숨겨지도록
          }
        }); // rootMargin 미동작 (인스타그램에서 자체적으로 막아놓은 것 같기도 함)
      },
      { rootMargin: innerHeight + "px" }
    );

    io.observe($loading); // 이 api가 로딩이미지 element를 바라보고 있다.
    // 이 로딩이미지가 화면 밖으로 빠져나왔을떄 , 바라보기 종료
  };

  const ajaxMore = async () => {
    const pageDataList = await fetch();
    $feed && $feed.addFeedItems(profileData, pageDataList); // 자식 컴포넌트 에 프로필 데이터와 다음에 추가될 데이터를 추가한다.
  };
  const render = () => {
    $parent.insertAdjacentHTML(
      "beforeend",
      `
            <div class="_2z6nI">
                <div style="flex-direction: column;">
                </div>
                <div class="_4emnV">
                    <div class="Igw0E IwRSH YBx95 _4EzTm _9qQ0O ZUqME" style="height: 32px; width: 32px;"><svg aria-label="읽어들이는 중..." class="By4nA" viewBox="0 0 100 100"><rect fill="#555555" height="6" opacity="0" rx="3" ry="3" transform="rotate(-90 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.08333333333333333" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.16666666666666666" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.25" rx="3" ry="3" transform="rotate(0 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.3333333333333333" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.4166666666666667" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.5833333333333334" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.6666666666666666" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.8333333333333334" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.9166666666666666" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"></rect></svg></div>
                </div>
            </div>
        `
    );
  };

  return { $el, create, destroy };
};

// TODO 뷰 역할인 Feed 컴포넌트에 이미지 레이지로드 기능 추가 - initInfiniteScroll 히스토리 참고
const Feed = ($parent, profileData = {}, pageDataList = []) => {
  const $elList = [];

  const create = () => {
    addFeedItems(profileData, pageDataList);
  };

  const destroy = () => {
    $elList.forEach($el => $parent.removeChild($el));
  };

  const addFeedItems = (profileData = {}, pageDataList = []) => {
    const firstIndex = $parent.children.length; // 부모의자식의 크기가 첫번째 인덱스 lastindex = length -1
    render(profileData, pageDataList); // 그린다.
    $elList.push(...[].slice.call($parent.children, firstIndex)); // 부모의 자식의 엘리먼트들의 첫번째부터 끝까지 얕은 복사한다음에 푸시
    lazyLoad();
  };

  const lazyLoad = () => {
    const io = new IntersectionObserver((entryList, observer) => {
      entryList.forEach(async entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          const lazyLoadImgs = entry.target.querySelector(".FFVAD");
          // data-src로 교체
          lazyLoadImgs.src = lazyLoadImgs.dataset.src;
        }
      });
    });

    console.log($elList);
    $elList.forEach($el => {
      io.observe($el); //
    });
  };

  const render = (profileData, pageDataList) => {
    const html = pageDataList.reduce((html, data) => {
      html += `
                <article id="feed" class="M9sTE h0YNM SgTZ1">
                    <header class="Ppjfr UE9AK wdOqh">
                        <div class="RR-M- h5uC0 mrq0Z" role="button" tabindex="0">
                            <canvas class="CfWVH" height="126" width="126" style="position: absolute; top: -5px; left: -5px; width: 42px; height: 42px;"></canvas>
                            <span class="_2dbep" role="link" tabindex="0" style="width: 32px; height: 32px;"><img alt="${profileData.name}님의 프로필 사진" class="_6q-tv" src="${common.IMG_PATH}${profileData.img}"></span>
                        </div>
                        <div class="o-MQd">
                            <div class="e1e1d">
                                <h2 class="BrX75"><a class="FPmhX notranslate nJAzx" title="${profileData.name}" href="javascript:;">${profileData.name}</a></h2>
                            </div>
                        </div>
                    </header>
                    <div class="_97aPb">
                        <div role="button" tabindex="0" class="ZyFrc">
                            <div class="eLAPa kPFhm">
                                <div class="KL4Bh" style="padding-bottom: 100%;"><img class="FFVAD" alt="${data.name}" src="${common.IMG_PATH}/lazy${data.img}" data-src="${common.IMG_PATH}${data.img}" style="object-fit: cover;"></div>
                                <div class="_9AhH0"></div>
                            </div>
                        </div>
                    </div>
                    <div class="eo2As">
                        <section class="ltpMr Slqrh">
                            <span class="fr66n"><button class="dCJp8 afkep"><span aria-label="좋아요" class="glyphsSpriteHeart__outline__24__grey_9 u-__7"></span></button></span>
                            <span class="_15y0l"><button class="dCJp8 afkep"><span aria-label="댓글 달기" class="glyphsSpriteComment__outline__24__grey_9 u-__7"></span></button></span>
                            <span class="_5e4p"><button class="dCJp8 afkep"><span aria-label="게시물 공유" class="glyphsSpriteDirect__outline__24__grey_9 u-__7"></span></button></span>
                            <span class="wmtNn"><button class="dCJp8 afkep"><span aria-label="저장" class="glyphsSpriteSave__outline__24__grey_9 u-__7"></span></button></span>
                        </section>
                        <section class="EDfFK ygqzn">
                            <div class=" Igw0E IwRSH eGOV_ ybXk5 vwCYk">
                                <div class="Nm9Fw"><a class="zV_Nj" href="javascript:;">좋아요 <span>${data.clipCount}</span>개</a></div>
                            </div>
                        </section>
                        <div class="KlCQn EtaWk">
                            <ul class="k59kT">
                                <div role="button" class="ZyFrc">
                                    <li class="gElp9" role="menuitem">
                                        <div class="P9YgZ">
                                            <div class="C7I1f X7jCj">
                                                <div class="C4VMK">
                                                    <h2 class="_6lAjh"><a class="FPmhX notranslate TlrDj" title="${profileData.name}" href="javascript:;">${profileData.name}</a></h2>
                                                    <span>${data.text}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                                <li class="lnrre">
                                    <button class="Z4IfV sqdOP yWX7d y3zKF" type="button">댓글 <span>${data.commentCount}</span>개 모두 보기</button>
                                </li>
                            </ul>
                        </div>
                        <section class="sH9wk _JgwE eJg28">
                            <div class="RxpZH"></div>
                        </section>
                    </div>
                    <div class="MEAGs">
                        <button class="dCJp8 afkep"><span aria-label="옵션 더 보기" class="glyphsSpriteMore_horizontal__outline__24__grey_9 u-__7"></span></button>
                    </div>
                </article>
            `;
      return html;
    }, "");
    $parent.insertAdjacentHTML("beforeend", html);
  };

  return { $elList, create, destroy, addFeedItems }; // 부모에서 호출하기 위해서 api로 열어준다
  // 부모에서 호출하는 이러한 형태는 후반에서는 끊어줄 예정이다.
};

const root = Root("main");
root.create();
// root.destroy();
// root.create();
